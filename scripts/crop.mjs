import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE || "http://localhost:3000";
const OUT = "screenshots-out";
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 300));

const targets = [
  ['section[aria-labelledby="hero-title"]', "crop-hero"],
  ['section[aria-labelledby="previews-title"]', "crop-previews"],
  ['section[aria-labelledby="how-title"]', "crop-how"],
  ['section[aria-labelledby="pricing-title"]', "crop-pricing"],
  ['section[aria-labelledby="cta-title"]', "crop-cta"],
  ["header", "crop-nav"],
];

for (const [sel, name] of targets) {
  const el = await page.$(sel);
  if (!el) {
    console.log("missing", sel);
    continue;
  }
  await el.screenshot({ path: `${OUT}/${name}.png` });
  console.log("shot", name);
}

await browser.close();
console.log("done");
