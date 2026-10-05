import { chromium } from "playwright";
import lighthouse from "lighthouse";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";
const origin = "https://veydock.vercel.app";
const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: ["--remote-debugging-port=9333"],
});
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(origin, { waitUntil: "networkidle" });
const axe = await new AxeBuilder({ page }).analyze();
await writeFile(
  "research/accessibility.json",
  JSON.stringify({ violations: axe.violations }, null, 2),
);
console.log(
  "Axe violations",
  axe.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => n.target),
  })),
);
for (const mode of ["desktop", "mobile"]) {
  const options = {
    port: 9333,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    ...(mode === "desktop"
      ? {
          formFactor: "desktop",
          screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          },
          throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
          },
        }
      : {}),
  };
  const run = await lighthouse(origin, options);
  await writeFile(`research/lighthouse-${mode}.json`, run.report);
  console.log(
    mode,
    Object.fromEntries(
      Object.entries(run.lhr.categories).map(([k, v]) => [k, v.score * 100]),
    ),
    Object.entries(run.lhr.audits)
      .filter(([, v]) => v.score !== null && v.score < 1 && v.details)
      .map(([k, v]) => ({ id: k, title: v.title, score: v.score })),
  );
}
await browser.close();
