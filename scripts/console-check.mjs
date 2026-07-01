import puppeteer from "puppeteer";
const b = await puppeteer.launch({ headless: "new" });
const routes = ["/", "/terms", "/privacy", "/support"];
let total = 0;
for (const r of routes) {
  const p = await b.newPage();
  const msgs = [];
  p.on("console", m => { if (m.type() === "error" || m.type() === "warning") msgs.push(`[${m.type()}] ${m.text()}`); });
  p.on("pageerror", e => msgs.push(`[pageerror] ${e.message}`));
  await p.goto(`http://localhost:3000${r}`, { waitUntil: "networkidle0" });
  // interact: open a FAQ item / toggle pricing to surface client errors
  await new Promise(res=>setTimeout(res,300));
  console.log(`${r}: ${msgs.length} issue(s)`);
  msgs.forEach(m => { console.log("   " + m); total++; });
  await p.close();
}
console.log(`TOTAL console errors/warnings: ${total}`);
await b.close();
