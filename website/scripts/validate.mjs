import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
const origin = process.env.TEST_ORIGIN || "https://veydock-website.vercel.app";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await mkdir("research", { recursive: true });
const results = [];
for (const width of [1920, 1440, 1366, 820, 430, 390]) {
  await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
  const response = await page.goto(origin, { waitUntil: "networkidle" });
  await page.screenshot({
    path: `research/production-${width}.png`,
    fullPage: true,
  });
  const metrics = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h1: document.querySelectorAll("h1").length,
  }));
  if (metrics.scrollWidth > width) throw Error("Overflow " + width);
  results.push({ width, status: response.status(), ...metrics });
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(origin);
await page.keyboard.press("Control+k");
await page.waitForSelector("dialog[open]");
await page.keyboard.press("ArrowDown");
await page.keyboard.press("Enter");
if (!(await page.locator("#command-result").innerText()))
  throw Error("Demo failed");
await page.keyboard.press("Escape");
if (await page.locator("dialog").isVisible()) throw Error("Escape failed");
const sitemap = await (await page.request.get(origin + "/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const meta = [];
for (const url of urls) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });
  const m = await page.evaluate(() => ({
    title: document.title,
    description: document
      .querySelector("meta[name=description]")
      ?.getAttribute("content"),
    canonical: document
      .querySelector("link[rel=canonical]")
      ?.getAttribute("href"),
    h1: document.querySelectorAll("h1").length,
    images: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
    schema: [
      ...document.querySelectorAll('script[type="application/ld+json"]'),
    ].map((s) => JSON.parse(s.textContent)),
  }));
  if (
    response.status() !== 200 ||
    !m.description ||
    m.h1 !== 1 ||
    m.canonical !== url ||
    m.images
  )
    throw Error("Meta failure " + url);
  meta.push({ url, status: response.status(), ...m });
}
const notfound = await page.goto(origin + "/not-a-real-page");
if (notfound.status() !== 404) throw Error("404 status " + notfound.status());
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(origin);
const reduced = await page
  .locator(".universal-heading")
  .evaluate((el) => getComputedStyle(el).animationName);
if (reduced !== "none") throw Error("Reduced motion failed");
await page.goto(origin + "/download");
const link = page.locator("[data-download]");
const downloadURL = await link.getAttribute("href");
const asset = await page.request.get(downloadURL);
if (asset.status() !== 200) throw Error("Download failed " + asset.status());
const body = await asset.body();
if (body[0] !== 77 || body[1] !== 90) throw Error("Not executable");
await writeFile(
  "research/validation.json",
  JSON.stringify(
    {
      origin,
      results,
      meta,
      errors,
      reduced,
      download: {
        url: downloadURL,
        status: asset.status(),
        bytes: body.length,
      },
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({
    pages: meta.length,
    results,
    errors,
    downloadBytes: body.length,
  }),
);
await browser.close();
