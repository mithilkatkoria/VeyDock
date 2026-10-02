import { chromium } from "playwright";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("https://veydock-website.vercel.app", {
  waitUntil: "networkidle",
});
await page.screenshot({ path: "research/hero-desktop.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: "networkidle" });
await page.screenshot({ path: "research/hero-mobile.png" });
await page.locator("#sequence").scrollIntoViewIfNeeded();
await page.screenshot({ path: "research/sequence-mobile.png" });
await browser.close();
