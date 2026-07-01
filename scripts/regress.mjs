import puppeteer from "puppeteer";
const b = await puppeteer.launch({ headless: "new" });
let errs = 0;
for (const r of ["/", "/terms", "/privacy", "/support"]) {
  const p = await b.newPage();
  p.on("console", m => { if (m.type()==="error") { console.log(`${r} [err] ${m.text()}`); errs++; } });
  p.on("pageerror", e => { console.log(`${r} [pageerror] ${e.message}`); errs++; });
  await p.goto(`http://localhost:3000${r}`, { waitUntil: "networkidle0" });
  await p.close();
}
// nav height + toggle target
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 900 });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
const navH = await p.evaluate(() => Math.round(document.querySelector("header").getBoundingClientRect().height));
const toggleH = await p.evaluate(() => Math.round(document.querySelector('#pricing button').getBoundingClientRect().height));
const linkH = await p.evaluate(() => Math.round(document.querySelector('header [class*="link"]').getBoundingClientRect().height));
console.log(`nav height: ${navH}px, desktop link hit-height: ${linkH}px, pricing toggle btn: ${toggleH}px`);
// overflow re-check at 360
await p.setViewport({ width: 360, height: 800 });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
const ovf = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
console.log(`360px horizontal overflow: ${ovf}`);
console.log(`TOTAL console errors: ${errs}`);
await b.close();
