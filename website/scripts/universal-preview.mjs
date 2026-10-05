import { chromium } from "playwright";
import sharp from "sharp";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.addInitScript(() =>
  localStorage.setItem("draey.streamer-mode.v1", "on"),
);
await page.goto("http://127.0.0.1:1421", { waitUntil: "networkidle" });
await page.locator(".launch-intro").waitFor({ state: "hidden" });
await page.waitForTimeout(500);
await page.getByRole("button", { name: "Claude beta", exact: true }).click();
if ((await page.locator(".profile-card").count()) !== 1)
  throw new Error("Claude filter failed");
if (
  !(await page.locator(".profile-card").innerText()).includes("Last confirmed")
)
  throw new Error("Claude freshness missing");
if ((await page.locator(".profile-card").innerText()).includes("Banked resets"))
  throw new Error("Codex credit leakage");
await page.getByRole("button", { name: "All providers", exact: true }).click();
for (const [i, el] of (await page.locator(".profile-card h3").all()).entries())
  await el.evaluate(
    (e, text) => (e.textContent = text),
    ["Codex Personal", "Claude Work", "Codex Spare", "Codex Reserved"][i],
  );
await page.screenshot({ path: "research/mixed-interface.png" });
await sharp("research/mixed-interface.png")
  .webp({ quality: 87 })
  .toFile("public/media/veydock-mixed-provider-dock.webp");
for (const width of [1366, 820, 430, 390]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.screenshot({ path: `research/app-${width}.png`, fullPage: true });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error(`App overflow ${width}`);
}
await browser.close();
console.log(
  "Mixed provider filter, quota labelling, privacy preview and responsive captures passed",
);
