import puppeteer from "puppeteer";
const b = await puppeteer.launch({ headless: "new" });
const p = await b.newPage();
await p.setViewport({ width: 360, height: 800, deviceScaleFactor: 1 });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
const info = await p.evaluate(() => {
  const main = document.querySelector("main");
  const sections = [...main.children].map(el => ({
    tag: el.tagName.toLowerCase(),
    id: el.id || el.getAttribute("aria-labelledby") || el.className?.toString?.().slice(0,24) || "",
    h: Math.round(el.getBoundingClientRect().height),
  }));
  const docW = document.documentElement.clientWidth;
  const scrollW = document.documentElement.scrollWidth;
  const wide = [...document.querySelectorAll("*")].filter(e => e.getBoundingClientRect().right > docW + 1).slice(0,8).map(e=>({t:e.tagName,c:(e.className?.toString?.()||"").slice(0,40),r:Math.round(e.getBoundingClientRect().right)}));
  return { mainChildren: main.children.length, sections, docW, scrollW, overflow: scrollW>docW+1, wide };
});
console.log(JSON.stringify(info, null, 2));
await b.close();
