import puppeteer from "puppeteer";
const b = await puppeteer.launch({ headless: "new" });
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
await p.evaluate(() => document.fonts.ready);
const el = await p.$("footer");
await el.screenshot({ path: "screenshots-out/crop-footer.png" });
await b.close(); console.log("footer shot");
