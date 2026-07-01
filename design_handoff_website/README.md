# Handoff: Bedly Marketing Website (Next.js)

> Target implementer: Claude Opus 4.8 in Claude Code. Target stack: **Next.js (App Router) + React + TypeScript**.
> This document is self-sufficient — you can implement the whole site from this README alone. The
> bundled `.dc.html` files are **design references** (HTML prototypes showing the intended look and
> behavior), NOT production code to copy. Recreate them as clean, idiomatic Next.js + React components.

---

## 1. Overview

Bedly is a playful iOS habit app: you make your bed, scan it, an AI gives it a 0–100 score, and you
build streaks + compete with friends ("squads"). This handoff covers the **public marketing website**:

| Route | Page | Source reference |
|---|---|---|
| `/` | Landing page (conversion-focused) | `design-files/Bedly Landing.dc.html` |
| `/terms` | Terms of Service | `design-files/Bedly Terms.dc.html` |
| `/privacy` | Privacy Policy | `design-files/Bedly Privacy.dc.html` |
| `/support` | Support / FAQ (interactive accordion) | `design-files/Bedly Support.dc.html` |

Primary conversion goal: **App Store downloads** (iOS only for now). Secondary: surface trustworthy
legal + support pages.

**Brand voice:** "Playful but credible" — fun, warm headlines; grounded, honest body copy. Tagline:
**"Make your bed. Make your day."** Footer signature: *"Made with rumpled love."*

**Legal entity:** PixelPaw SRL, Bucharest, Romania · support email **hello@bedly.app** · © 2026.

> ⚠️ **Truthfulness constraints (important).** Do NOT add: star ratings, review counts, download
> counts, or "X beds made" style traction numbers — the app has none yet. Do NOT claim scanning is
> "on-device", "100% on device", or that "photos never leave your phone". The ONLY privacy claim
> allowed is: **"We never store your photos"** (the photo is used to compute a score, then deleted).
> These rules already shaped the copy below — keep them if you edit anything.

---

## 2. Fidelity

**High-fidelity.** Final colors, typography, spacing, copy, and interactions are all specified. Recreate
pixel-faithfully, but use real responsive layout (the prototypes are fixed-width canvases). Use the exact
hex values, fonts, and copy in this document.

---

## 3. Recommended project setup

```
npx create-next-app@latest bedly-web --typescript --app --eslint
```

- **Styling:** Tailwind CSS is the cleanest fit (utility classes map directly to the inline styles in the
  prototypes). Plain CSS Modules are fine too. Define the design tokens (§7) as Tailwind theme
  extensions or CSS custom properties — do not hardcode hex values ad hoc.
- **Fonts:** use `next/font/google` for **Fredoka** (display/headings/wordmark, weights 400–700) and
  **Nunito** (body/UI, weights 500–800). Expose as CSS vars `--font-fredoka` / `--font-nunito`.
- **Icons:** the prototypes use **Phosphor Icons**. Install `@phosphor-icons/react`. Icon names referenced
  below use Phosphor's kebab names (e.g. `apple-logo`, `fire`, `seal-check`); in React these are
  `<AppleLogo weight="fill" />`, `<Fire weight="fill" />`, etc. Most are the **fill** weight; check marks
  in pricing use **bold**.
- **Images:** use `next/image`. Assets are in `assets/` (see §9).
- **SEO:** per-route `metadata` exports — title, description, Open Graph image (use the app icon),
  `apple-itunes-app` meta tag for the App Store smart banner once you have an App ID.
- **Accessibility:** semantic landmarks (`<header><nav><main><footer>`), the FAQ accordion must be
  keyboard-operable (`<button>` triggers, `aria-expanded`, `aria-controls`), all icons decorative unless
  they carry meaning, color contrast already meets AA on the cream background.

Suggested component tree:

```
app/
  layout.tsx            // fonts, <html>, global tokens, shared <SiteFooter/> NOT here (footer differs)
  page.tsx              // Landing
  terms/page.tsx
  privacy/page.tsx
  support/page.tsx
components/
  BedBuddy.tsx          // the mascot (see §6) — the single most reused piece
  SiteNav.tsx           // sticky translucent header (two variants: full vs minimal)
  SiteFooter.tsx        // dark footer (landing) — legal/support use a simpler centered link row
  PhoneFrame.tsx        // reusable device bezel wrapper (see §5 — fixes the one tricky bug)
  Sparkle.tsx           // 4-point star accent (clip-path)
  sections/
    Hero.tsx  StatBar.tsx  HowItWorks.tsx  AppPreviews.tsx
    Features.tsx  Pricing.tsx  FinalCTA.tsx
  faq/FaqAccordion.tsx
```

---

## 4. Design system (global)

- **Page background (cream):** `#FFF3EA`. Body text ink: `#2A2140`. Muted text: `#857B95`; lighter muted
  `#9A90A8`; nav link grey `#6B6280`.
- **Signature "sunset" gradient** (hero, CTAs, Pro card, page heroes):
  `radial-gradient(125% 90% at 50% -10%, #FF8A6B 0%, #FF6F8E 46%, #9F6BE6 100%)`.
  The exact stop %/position varies slightly per use (see each section); the three colors are constant.
- **Section rhythm:** cream is the default; the **Features** section sits on **white** (`#fff`) to break
  the page. Cards are white with radius 24–28px and soft shadow `0 12px 30px rgba(42,33,64,.07)`.
- **Global reset (critical):** apply `*, *::before, *::after { box-sizing: border-box; }`. The prototype
  bug history: without border-box, the phone-mockup inner screens overflow their bezels. In React + a
  normal CSS reset / Tailwind preflight this is already handled — just don't disable it.
- **Type:** headings/wordmark/buttons = Fredoka; everything else = Nunito. Body weight is mostly 600.
  Section H2s: Fredoka 700, `clamp(30px,4vw,44px)`, letter-spacing `-1px`. Hero H1: Fredoka 700,
  `clamp(40px,5.4vw,64px)`, line-height 1.04, letter-spacing `-1.5px`.
- **Eyebrow label** (above section titles): Fredoka 700, 13px, uppercase, letter-spacing 1px, color
  `#FF6F5E`.
- **Wordmark:** "Bedly" in Fredoka 700 with the period as a separate `<span>` colored `#FFCB2D`.

---

## 5. The PhoneFrame component (and the bug to avoid)

The site shows iPhone mockups. Build ONE `<PhoneFrame>` wrapper so they're consistent.

- **Bezel:** dark `#16121F`, `padding: 10–11px`, `border-radius: 38–42px`, drop shadow
  `0 30–40px 60–80px rgba(42,33,64,.28–.4)`. A notch pill (`#000`, ~90×24px, radius 13px) absolutely
  positioned at the top center.
- **Screen (inner):** `height: 100%`, `border-radius: 30–32px`, `overflow: hidden`, its own padding.
  The screen background is per-mockup (cream, or a gradient).
- **THE BUG:** with content-box sizing, `height:100%` + screen padding makes the screen taller than the
  bezel, so its rounded background spills past the frame. **Fix = border-box** (already in the global
  reset). Verify after building: the inner screen's bottom should sit a few px *inside* the bezel.

Mockup sizes used (bezel W×H): hero `286×600`, previews `262×556` (center, "home") and `248×516`
(side, "scan result" & "squad"). These are reference sizes — keep the aspect ratio; you can scale down
responsively.

---

## 6. BedBuddy mascot — the key reusable asset

BedBuddy is a chunky bed character (a duvet body with two big rounded white eyes, blush cheeks, a mouth)
that appears ~6 times across the site in different moods/sizes. Reference implementation:
`design-files/BedBuddy.dc.html` (pure HTML/CSS, no SVG — built from positioned divs + clip-paths).

**Two valid approaches — pick based on need:**

1. **Static image (simplest, recommended for the website).** Use the pre-exported transparent PNG
   `assets/bedly-mascot.png` (the happy mood) via `next/image`. Fast, zero animation cost. Good enough
   for marketing if you only need the happy face. Downside: one mood only, no animation.

2. **React component (faithful, animated).** Port `BedBuddy.dc.html` to `components/BedBuddy.tsx` with a
   `mood` prop. This is the better match because the site uses **three moods**:
   - `happy` (default) — round eyes (19×21px dark ovals w/ white glint), pink cheeks, U-shaped smile.
   - `ecstatic` — upturned arc eyes, open laughing mouth with tongue, plus floating sparkles; bobs faster.
   - `sad` — round eyes, angled brows, frown, a blue tear drip, floating "z z"; (used on the "your bed
     misses you" preview).
   Props in the prototype: `mood` (happy|sad|ecstatic), `duvet` (coral|mint|grape|sky|pink|gold),
   `hat` (none|crown|nightcap|party), `shades` (bool). For the website you mainly need `mood`; `hat`
   appears on the final-CTA mascot (optional flourish).

   **Intrinsic size:** the mascot art is authored in a **220×190px** box. Everything inside is absolutely
   positioned against that box. To render it smaller, DON'T just shrink the container (that clips/
   misaligns). Instead wrap it and scale: a sized outer box + an inner 220×190 box with
   `transform: scale(S); transform-origin: top left;` where the outer box = `220*S × 190*S`. In React,
   accept a `scale` (or `width`) prop and compute this. This is exactly how the prototype fixed its
   overflow/alignment problems — replicate it.

   Mood → derived flags (from the prototype logic):
   - `roundEyes = happy || sad`; `showCheeks = happy || ecstatic`; bob animation = `ecstatic` is faster.
   - Duvet gradients: coral `linear-gradient(160deg,#FF8466,#FF6A4A)`, mint `#43D6A0→#1FBF8E`,
     grape `#A87BEA→#8E5BE0`, sky `#5BCBF2→#34AEE0`, pink `#FF93BC→#FF5D98`, gold `#FFD45E→#FFB020`.

   Keyframes (respect `prefers-reduced-motion` — disable bob/twinkle): bob `translateY 0→-7px`, 3.2s;
   fast bob `0→-12px`; blink `scaleY 1→.12` at 95% of a 4.2s loop; sparkle twinkle rotate+scale.

The **app-icon mark** in nav/footer is BedBuddy on the sunset gradient inside a rounded square (radius
10–11px) with `overflow:hidden`, the mascot scaled down (~0.16) and centered. Or just use
`assets/bedly-icon-512.png` in an `<Image>` — simpler and identical result.

---

## 7. Design tokens (exact values)

**Colors**
```
ink            #2A2140      cream-bg        #FFF3EA
mascot-ink     #3A2A4A      white-card      #FFFFFF
coral          #FF6F5E      coral-pressed   #FF5E4A    coral-deep #FF6A4A
sunshine       #FFCB2D      grape           #9B5DE5    grape-2    #8E5BE0
mint           #21C997      mint-2          #1FBF8E
sky            #4CC9F0      sky-2           #34AEE0
pink           #FF5DA2      pink-soft       #FF9DB1
dark-ui        #16121F      (phone bezel, footer bg)
muted          #857B95      muted-light     #9A90A8    nav-grey  #6B6280
hairline       #F1E9EF      features-bg     #FFF7F2    (also card tint)
```

**Gradients** (160deg linear unless noted)
```
sunset (signature) radial-gradient(125% 90% at 50% -10%, #FF8A6B, #FF6F8E 46%, #9F6BE6)
coral btn/card     linear-gradient(160deg,#FF8466,#FF5E4A)
mint               linear-gradient(160deg,#3FD8A0,#21C997)
grape              linear-gradient(160deg,#A87BEA,#8E5BE0)
sky                linear-gradient(160deg,#5BCBF2,#34AEE0)
gold               linear-gradient(160deg,#FFD45E,#FFB020)
pink               linear-gradient(160deg,#FF93BC,#FF5D98)
```

**Radius:** chips/badges 13–16px · buttons 16–17px · cards 20–28px · phone bezel 38–42px · app-icon mark
10–11px · pills/circles 50%.

**Shadow:** card `0 12px 30px rgba(42,33,64,.07)`; soft card `0 6px 16px rgba(42,33,64,.06)`;
colored-button shadows tint to the gradient (e.g. coral `0 9px 18px rgba(255,94,74,.28)`); phone
`0 30–40px 60–80px rgba(42,33,64,.28–.4)`; sunset CTA `0 22–30px 50–70px rgba(159,107,230,.3–.36)`.

**Spacing:** content max-width **1180px** (landing) / **760px** (text pages), side padding 28px. Section
vertical padding ~80–90px. Card padding 26–32px.

**Type scale:** see §4. Body 15–18px / weight 600 / line-height ~1.55–1.7.

**Sparkle shape** (4-point star), reused as decorative accents:
`clip-path: polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)` — color from
{sunshine, white, sky, mint}, sizes 11–24px, slow twinkle animation, scattered in hero/CTA backgrounds.

---

## 8. Page-by-page spec

### 8.1 Landing (`/`)

Top-to-bottom sections:

1. **Sticky nav** — translucent cream `rgba(255,243,234,.82)` + `backdrop-filter: blur(14px)`, bottom
   hairline. Left: app-icon mark + "Bedly." wordmark. Right: anchor links *How it works · Features ·
   Pricing*, a *Support* link (→ `/support`), and a coral **Download** button (`#FF6F5E`, white text,
   Apple-logo icon, radius 14px, height 44px). Links are Fredoka 500, 15px, color `#6B6280`. Anchor links
   scroll to in-page sections (`#how`, `#features`, `#pricing`, `#get`); enable `scroll-behavior:smooth`.

2. **Hero** — sunset-gradient background, decorative sparkles, ends with an SVG wave divider into the
   cream. Two columns (wrap on mobile):
   - Left: a pill badge (translucent white) "✨ The playful make-your-bed habit"; H1 **"Win your morning
     before it begins."**; subcopy *"Make your bed, scan it, and let our AI score your handiwork 0–100.
     Build a streak, rally your squad, and start every day with a win."*; a black **App Store** download
     button (dark `#16121F`, ~60px tall, Apple logo + "Download on the / App Store" two-line label); and
     a **trust badge** next to it: camera-slash icon + **"We never store your photos"** (do NOT put star
     ratings here).
   - Right: a `286×600` **PhoneFrame** showing the app "home, bed made" state — greeting "Good morning,
     Alex 👋", a streak pill (fire icon + "7"), a green card (mint gradient) containing an **ecstatic**
     BedBuddy + "Bed made. You legend." / "Scored 92 today · streak secured", and a row of 3 white stat
     tiles (streak 7 / points 1,240 / squad rank #2). The phone gently floats (translateY ±12px, 6s).

3. **Stat bar** — a single white rounded card overlapping up from the hero, 4 columns. **Use these exact
   honest values (no traction metrics):** `0–100` "your daily bed score" (coral) · `2 min` "to a better
   morning" (grape) · `0` "photos stored" (mint) · `Free` "to start, forever" (sky). Numbers are
   Fredoka 700 34px in the listed accent color.

4. **How it works** (`#how`) — eyebrow "HOW IT WORKS", H2 **"Four taps to a tidier you"**, subcopy
   *"No spreadsheets, no guilt trips. Just a quick morning ritual that earns you the rest of your day."*
   Then **4 cards** (flex, wrap), each with a big faint number watermark (1–4), a gradient icon tile
   (60×60, radius 18), title, body:
   1. **Scan your bed** (sky tile, camera icon) — "Point your camera at your freshly-made bed. BedBuddy's
      AI checks the pillows, corners and fluff in seconds." *(note: no "on-device" claim.)*
   2. **Get your score** (mint tile, seal-check icon) — "A 0–100 rating lands instantly, with friendly
      tips to level up tomorrow. Hospital corners? Chef's kiss."
   3. **Unlock your day** (grape tile, lock-key-open icon) — "Keep your most distracting apps — Instagram,
      TikTok, X — locked until your bed is made. Make it to earn your morning scroll."
   4. **Build your streak** (coral tile, fire icon) — "Rack up points and climb your squad's leaderboard.
      Nudge the friends who are slacking. Lovingly."

5. **App previews** — H2 **"A morning ritual you'll actually open"**, subcopy *"Bright, satisfying and a
   little bit silly — exactly enough to get you out of bed."* Three PhoneFrames, bottom-aligned, center
   one lifted/larger:
   - **Scan result** (248×516, mint→teal gradient screen): ecstatic BedBuddy, a circular score ring
      (conic-gradient at ~92%) showing **92 / out of 100**, "Crisp & clean!", chips "+92 pts" and "🔥 +1".
   - **Home — not made** (262×556, cream screen, center): greeting + streak pill, a coral card with a
      **sad** BedBuddy + "Your bed misses you." + a white **"Scan my bed"** button, and a "This week"
      card with a 7-dot day tracker (3 done green, today outlined coral, rest grey).
   - **Squad** (248×516, cream screen): "Your squad" + add button, a leaderboard of 4 rows (rank, colored
      avatar initial, name, 🔥 streak · points). Row 2 is "You" highlighted (coral border + YOU badge);
      row 3 "Leo" has a coral "Nudge" chip.

6. **Features** (`#features`) — on **white** background. Eyebrow "FEATURES", H2 **"Everything you need to
   keep the streak"**, then a responsive grid (`minmax(300px,1fr)`) of **6 tinted cards** (bg `#FFF7F2`,
   radius 24): each has a 52×52 gradient icon tile + title + body:
   - **AI bed scoring** (coral, sparkle) — "A friendly model rates fluff, corners and pillow game 0–100 —
     and tells you how to do better."
   - **Streaks & freezes** (gold, shield-check) — "Keep your chain alive every morning. Pro's Streak
     Freeze saves your day when life gets in the way."
   - **Squads & nudges** (grape, users-three) — "Add your friends, climb the leaderboard, and send a
     loving nudge to whoever's still under the covers."
   - **Sticker achievements** (mint, medal) — "Collect playful badges for every milestone, from your First
     Make to the elusive Perfect 100."
   - **Gentle reminders** (sky, bell) — "One kind nudge each morning, at the time you choose. No nagging,
     no notification spam."
   - **BedBuddy moods** (pink, smiley) — "Your mascot reacts to your progress — and with Pro, dresses up
     in hats, shades and duvet colors."

7. **Pricing** (`#pricing`) — eyebrow "PRICING", H2 **"Free to start. Pro to soar."**, subcopy *"The whole
   ritual is free forever. Upgrade when you want to protect your streak and dress up BedBuddy."* Two cards:
   - **Free** — white card, 2px hairline border. `$0` "forever". Checklist (mint check circles): Daily bed
     scan & AI score · Streak & points tracking · A squad of up to 5 friends · Core sticker achievements.
     CTA: cream **"Download free"** button.
   - **Bedly Pro** — **sunset gradient** card, white text, a "SAVE 40%" corner ribbon (sunshine bg). Title
     with a crown icon. Price is **billing-toggle aware** (see §10): annual `$39.99/yr` ("just $3.33/mo,
     billed yearly") or monthly `$6.99/mo` ("billed monthly"). Checklist (white check circles):
     *Everything in Free, plus…* · Streak Freeze for life's off-days · Mascot hats, shades & duvets ·
     Score history & weekly trends · **App blocking until your bed is made** · **Couples mode for you &
     your partner** · Bigger squads + custom nudges. CTA: white **"Start 7-day free trial"** button,
     subtext "Then {price}{per} · cancel anytime".
   *(The last two checklist items — App blocking, Couples mode — were added most recently; keep them.)*

8. **Final CTA** (`#get`) — a big rounded sunset-gradient panel (radius 40) with sparkles. A floating
   **happy** BedBuddy, H2 **"Make your bed. Make your day."**, subcopy *"Your first win of the day is two
   minutes away. Download Bedly and start your streak this morning."*, a black App Store button (gently
   pulsing scale animation), and a line "Free to download · Pro is optional · iPhone".

9. **Footer** — dark `#16121F`, white text. Left: app-icon mark + wordmark, a short blurb *"The playful
   habit tracker that turns making your bed into your favorite part of the morning."*, and *"Made with
   rumpled love."* Right: three link columns — **Product** (How it works, Features, Pricing) · **Company**
   (Support & FAQ → `/support`, Privacy Policy → `/privacy`, Terms of Service → `/terms`) · **Say hi**
   (hello@bedly.app `mailto:`). Bottom bar (hairline divider): "© 2026 PixelPaw SRL. All rights reserved."
   and "Bucharest, Romania".

### 8.2 Legal pages — Terms (`/terms`) & Privacy (`/privacy`)

Shared chrome (build a `LegalLayout`):
- **Minimal sticky nav:** wordmark (links home) on the left, a "← Back to home" link on the right.
- A header block: a small pill badge (Terms uses scroll icon + "Legal" in coral; Privacy uses lock icon +
  "Your privacy" in grape), H1, "Last updated 30 June 2026", and a **highlighted summary card** (white,
  soft shadow). Privacy's summary card leads with a camera-slash icon and **"We never store photos of your
  bed."**
- **Body:** one white rounded card (radius 26, padding `clamp(26px,4vw,46px)`) containing numbered H2
  sections (Fredoka 700, 22px) with body paragraphs (16px, line-height 1.7, color `#4A4360`, weight 600).
  Links are coral. A footnote info card at the end: *"This document is a starting draft for review by
  qualified legal counsel before publication. It is not legal advice."*
- **Footer:** simple centered row of cross-links (to the other two pages + Back to home).

Use the **full section text verbatim** from `design-files/Bedly Terms.dc.html` and
`design-files/Bedly Privacy.dc.html` — they're already written to the truthfulness constraints (Romania
/ GDPR / Apple billing / "we never store photos", with no on-device claim). Section lists:
- **Terms:** 1 Who can use Bedly · 2 Your account · 3 The bed score is for fun · 4 Acceptable use ·
  5 Squads & social features · 6 Bedly Pro, trials & billing · 7 Intellectual property · 8 Disclaimers ·
  9 Limitation of liability · 10 Changes · 11 Governing law (Romania) · 12 Contact.
- **Privacy:** 1 Bed photos are never stored · 2 Information we do collect (3 icon rows: Account /
  Activity / Device & diagnostics) · 3 How we use it · 4 Legal bases (GDPR) · 5 Who we share with
  (incl. the third-party scanning service + Apple for payments) · 6 Retention · 7 Your rights (GDPR,
  ANSPDCP) · 8 Children · 9 Changes · 10 Contact.

### 8.3 Support / FAQ (`/support`)

- Same minimal nav. A **sunset-gradient hero** (with wave divider) centered: a happy BedBuddy, H1 **"How
  can we help?"**, subcopy *"Answers to the things people ask us most — and a friendly human when you need
  one."*
- Two **contact cards** (overlapping up into cream): "Email us / hello@bedly.app" (coral tile, mailto
  link) and "Quick replies / Usually within one business day" (mint tile, clock icon).
- **FAQ accordion** — H2 "Frequently asked questions", then 8 expandable items. Exactly one open at a time
  (clicking an open item closes it). Each row: white card, question (Fredoka 600, 17px) + a circular
  caret button that rotates 180° when open; the answer panel animates open via `max-height` transition
  (~0.3s ease). **Implement as accessible buttons** with `aria-expanded`/`aria-controls`; animate height
  with CSS (or a measured height for smoothness). The 8 Q&As (verbatim) are in
  `design-files/Bedly Support.dc.html` (the `data` array in its script): AI score / photo storage /
  missed day / what's in Pro / cancel subscription / squads & nudges / supported devices / delete account.
  Note the answers reflect the truthfulness rules (e.g. "never stored", no "on your phone").
- **"Still tangled in the sheets?"** sunset-gradient CTA card → email button.
- Footer: centered cross-link row.

---

## 9. Assets

In `assets/`:
- `bedly-mascot.png` — transparent PNG of the **happy** BedBuddy (482×395). Use for static mascot needs.
- `bedly-icon-1024.png` — square opaque app icon (App Store / OG image / favicon source).
- `bedly-icon-512.png` — square icon (web/PWA, nav-mark fallback).
- `bedly-icon-1024-rounded.png` — squircle w/ transparent corners (marketing previews).

> The icon master was upscaled from a 512 capture — crisp at typical sizes; regenerate at true 1024 if you
> need it razor-sharp. For an animated/multi-mood mascot, port `BedBuddy.dc.html` (see §6) instead of the
> PNG. Phosphor icons come from the `@phosphor-icons/react` package (not bundled here).

---

## 10. State & interactions

Almost entirely static/presentational. The only interactive state:

- **FAQ accordion** (`/support`): `openIndex: number` (–1 = all closed). Click toggles; opening one closes
  the rest. Keyboard + ARIA as above.
- **Pricing billing toggle** (optional but recommended): a monthly/annual switch that swaps the Pro price
  (`$39.99/yr` ↔ `$6.99/mo`) and its subtext. In the prototype this was a build-time prop; on the site
  make it a small client `useState` toggle above the pricing cards. Default **annual** (shows "SAVE 40%").
- **Smooth-scroll** anchor nav on the landing page.
- **Animations:** mascot bob, sparkle twinkle, hero phone float, final-CTA button pulse. All subtle, all
  infinite ease-in-out; gate them behind `prefers-reduced-motion: reduce`.
- **App Store buttons:** point `href` at the real App Store URL once available; until then `#` or a
  "coming soon" mailto is fine. Keep them as `<a>` for SEO.

Responsive: the prototypes are desktop canvases. Implement mobile-first — stack the hero columns, let the
preview phones scroll horizontally or wrap, collapse the nav links into a simple menu under ~720px,
single-column the footer. Keep min tap targets ≥44px.

---

## 10b. Visual reference — full-page screenshots

Full-length renders of each page are in `screenshots/` — use these as the visual source of truth
alongside the per-section specs above:
- `screenshots/01-landing.png` — full landing page, top to bottom
- `screenshots/02-terms.png` — Terms of Service
- `screenshots/03-privacy.png` — Privacy Policy
- `screenshots/04-support.png` — Support / FAQ (shown with the first question expanded)

These are desktop-width (~924px) captures of the prototypes; treat them as look-and-feel references, not
exact pixel measurements (use §7 tokens for precise values).

## 11. Source reference files (in this bundle)

- `design-files/Bedly Landing.dc.html` — landing prototype
- `design-files/Bedly Terms.dc.html` — terms copy (verbatim source)
- `design-files/Bedly Privacy.dc.html` — privacy copy (verbatim source)
- `design-files/Bedly Support.dc.html` — support page + the 8 FAQ Q&As (in the `<script>` `data` array)
- `design-files/BedBuddy.dc.html` — mascot reference (port to `BedBuddy.tsx`)
- `design-files/support.js` — the prototype runtime; **ignore for implementation** (it only powers the
  `.dc.html` preview format, it is not part of the website).

> These `.dc.html` files use a custom prototype runtime (`<x-dc>`, `support.js`). Read them for layout,
> exact copy, colors, and structure — but build fresh React/Next components; do not try to run or port the
> runtime itself.

---

## 12. Acceptance checklist

- [ ] Four routes render: `/`, `/terms`, `/privacy`, `/support`, cross-linked via nav/footer.
- [ ] Fredoka + Nunito loaded via `next/font`; tokens centralized (no stray hex).
- [ ] Phone mockups: inner screen sits **inside** the bezel (border-box) — no gradient bleed.
- [ ] BedBuddy renders at multiple sizes without clipping (scale-wrapper technique) and in 3 moods if
      using the component approach.
- [ ] NO star ratings, review/download/"beds made" counts anywhere.
- [ ] NO "on-device" / "100%" / "never leaves your phone" claims; privacy line is exactly "We never store
      your photos".
- [ ] Pricing Pro card includes **App blocking** and **Couples mode** items; billing toggle works.
- [ ] FAQ accordion: one-open-at-a-time, keyboard accessible, animated.
- [ ] `prefers-reduced-motion` disables decorative animation.
- [ ] Per-route SEO metadata + OG image; Lighthouse a11y ≥ 95.
- [ ] Responsive down to 360px; tap targets ≥ 44px.
