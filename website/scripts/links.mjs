import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
const origin = "https://veydock-website.vercel.app";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const sitemap = await (
  await context.request.get(origin + "/sitemap.xml")
).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const links = new Set();
const broken = [];
const fragments = [];
for (const url of urls) {
  await page.goto(url);
  const list = await page
    .locator("a[href]")
    .evaluateAll((els) => els.map((el) => el.href));
  for (const link of list) {
    if (link.startsWith(origin)) {
      const u = new URL(link);
      if (u.hash) fragments.push({ page: url, url: link });
      else links.add(link);
    }
  }
}
for (const url of links) {
  const res = await context.request.get(url);
  if (res.status() >= 400) broken.push({ url, status: res.status() });
}
for (const { url } of fragments) {
  await page.goto(url);
  const id = decodeURIComponent(new URL(url).hash.slice(1));
  if (!(await page.evaluate((id) => !!document.getElementById(id), id)))
    broken.push({ url, reason: "Missing anchor" });
}
const resources = {};
for (const path of [
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "rss.xml",
  "media/veydock-social.png",
  "favicon.svg",
  "LICENSE.txt",
]) {
  const response = await context.request.get(origin + "/" + path);
  resources[path] = {
    status: response.status(),
    contentType: response.headers()["content-type"],
    body: path.endsWith(".txt") ? await response.text() : undefined,
  };
}
const robots = resources["robots.txt"].body;
if (!/User-agent: OAI-SearchBot\nAllow: \//.test(robots))
  throw Error("OAI bot blocked");
const aliases = await context.request.get(
  "https://veydock-website-881ipq8wc-mithilkatkoria-gmailcoms-projects.vercel.app",
);
const headers = (await context.request.get(origin)).headers();
await writeFile(
  "research/links.json",
  JSON.stringify(
    {
      broken,
      internalLinks: links.size,
      fragments: fragments.length,
      resources,
      headers,
      aliasRobots: aliases.headers()["x-robots-tag"],
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({
    broken,
    internalLinks: links.size,
    fragments: fragments.length,
    resources: Object.fromEntries(
      Object.entries(resources).map(([k, v]) => [k, v.status]),
    ),
    aliasRobots: aliases.headers()["x-robots-tag"],
  }),
);
await browser.close();
if (broken.length) process.exitCode = 1;
