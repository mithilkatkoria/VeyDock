import sharp from "sharp";
import { chromium } from "playwright";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.addInitScript(() =>
  localStorage.setItem("draey.streamer-mode.v1", "on"),
);
await page.goto("http://127.0.0.1:1421", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.evaluate(() => {
  document.querySelectorAll(".account-tile").forEach((el, i) => {
    const heading = el.querySelector("h2,h3");
    if (heading) heading.textContent = ["Plus 1", "Plus 2", "Plus 3", "Pro"][i];
  });
});
await page
  .locator(".profile-grid")
  .screenshot({ path: "public/media/profiles.png" });
await sharp("public/media/profiles.png")
  .resize({ width: 1600 })
  .webp({ quality: 85 })
  .toFile("public/media/veydock-multiple-codex-profiles.webp");
await page.screenshot({ path: "public/media/capture.png" });
await sharp("public/media/capture.png")
  .webp({ quality: 88 })
  .toFile("public/media/veydock-codex-switcher-windows.webp");
await page.goto("http://127.0.0.1:4321", { waitUntil: "networkidle" });
await page.screenshot({
  path: "public/media/website-first.png",
  fullPage: true,
});
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(
  `<html><head><link rel="stylesheet" href="http://127.0.0.1:4321/src/styles/site.css"></head><body style="width:1200px;height:630px;overflow:hidden;background:#0b0b0c;color:#e9e3d8;font-family:Arial,sans-serif"><div style="padding:60px;width:630px"><p style="color:#ff5a36;letter-spacing:5px;font-size:14px">VEYDOCK / WINDOWS</p><h1 style="font-size:66px;line-height:1.07;margin-top:50px">Codex profile<br>switching<br>for Windows.</h1><p style="color:#aaa49b;font-size:18px">Profiles. Real usage windows. Your next move.</p><p style="font-size:12px;margin-top:58px">MIT / INDEPENDENT / PUBLIC ALPHA</p></div><img src="http://127.0.0.1:4321/media/veydock-codex-switcher-windows.webp" style="position:absolute;left:630px;top:94px;width:1000px;border:1px solid #343437"><p style="position:absolute;left:650px;bottom:30px;font-size:11px;color:#aaa49b">DEVELOPMENT PREVIEW / SIMULATED DATA</p></body></html>`,
);
await page.waitForTimeout(1000);
await page.screenshot({ path: "public/media/veydock-social.png" });
await browser.close();
