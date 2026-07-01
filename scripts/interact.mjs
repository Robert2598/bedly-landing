import puppeteer from "puppeteer";
const b = await puppeteer.launch({ headless: "new" });

// 1) Pricing billing toggle
const p1 = await b.newPage();
await p1.setViewport({ width: 1280, height: 900 });
await p1.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
const annualPrice = await p1.evaluate(() => document.querySelector('#pricing [class*="priceWhite"]').textContent);
// click Monthly
await p1.evaluate(() => [...document.querySelectorAll('#pricing button')].find(b => b.textContent.trim()==='Monthly').click());
await new Promise(r=>setTimeout(r,150));
const monthlyPrice = await p1.evaluate(() => document.querySelector('#pricing [class*="priceWhite"]').textContent);
const monthlySub = await p1.evaluate(() => document.querySelector('#pricing [class*="proSub"]').textContent);
console.log(`PRICING toggle: annual=${annualPrice} -> monthly=${monthlyPrice} (${monthlySub})`);

// 2) FAQ one-open-at-a-time
const p2 = await b.newPage();
await p2.goto("http://localhost:3000/support", { waitUntil: "networkidle0" });
const initiallyOpen = await p2.evaluate(() => [...document.querySelectorAll('.faqWrap [aria-expanded], [class*="trigger"]')].map(b=>b.getAttribute('aria-expanded')));
// click 3rd question
await p2.evaluate(() => document.querySelector('#faq-q-2').click());
await new Promise(r=>setTimeout(r,150));
const afterClick = await p2.evaluate(() => [0,1,2].map(i=>document.querySelector(`#faq-q-${i}`).getAttribute('aria-expanded')));
console.log(`FAQ aria-expanded [q0,q1,q2] after opening q2: ${JSON.stringify(afterClick)} (expect only q2 true)`);

// 3) Mobile menu
const p3 = await b.newPage();
await p3.setViewport({ width: 375, height: 800 });
await p3.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
const menuBtnVisible = await p3.evaluate(() => { const btn=document.querySelector('header button[aria-label]'); return btn ? getComputedStyle(btn.closest('[class*="mobileWrap"]')).display : 'none'; });
const beforeExpanded = await p3.evaluate(() => document.querySelector('header button[aria-label]').getAttribute('aria-expanded'));
await p3.evaluate(() => document.querySelector('header button[aria-label]').click());
await new Promise(r=>setTimeout(r,150));
const afterExpanded = await p3.evaluate(() => document.querySelector('header button[aria-label]').getAttribute('aria-expanded'));
const linkCount = await p3.evaluate(() => document.querySelectorAll('[class*="panelLink"]').length);
console.log(`MOBILE menu: wrap display=${menuBtnVisible}, aria-expanded ${beforeExpanded}->${afterExpanded}, panel links=${linkCount}`);

await b.close();
