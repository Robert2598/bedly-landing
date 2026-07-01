import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE || "http://localhost:3000";
const OUT = "screenshots-out";

// route, label, widths, fullPage
const SHOTS = [
  { path: "/", name: "landing", widths: [1280, 924, 768, 390, 360] },
  { path: "/terms", name: "terms", widths: [1280, 924, 390] },
  { path: "/privacy", name: "privacy", widths: [1280, 924, 390] },
  { path: "/support", name: "support", widths: [1280, 924, 390, 360] },
];

const freeze = process.argv.includes("--freeze");

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: "new" });

for (const shot of SHOTS) {
  for (const width of shot.widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 2 });
    if (freeze) {
      await page.emulateMediaFeatures([
        { name: "prefers-reduced-motion", value: "reduce" },
      ]);
    }
    await page.goto(`${BASE}${shot.path}`, { waitUntil: "networkidle0", timeout: 60000 });
    // settle fonts/layout
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 350));
    const file = `${OUT}/${shot.name}-${width}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log("shot", file);
    await page.close();
  }
}

await browser.close();
console.log("done");
