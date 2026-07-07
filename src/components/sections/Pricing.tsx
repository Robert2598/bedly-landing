"use client";

import { useState } from "react";
import { Check, Crown } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { APP_STORE_URL } from "@/lib/config";
import styles from "./Pricing.module.css";

const FREE_FEATURES = [
  "Daily bed scan & AI score",
  "Streak & points tracking",
  "A squad of up to 5 friends",
  "Core sticker achievements",
];

const PRO_FEATURES = [
  "Everything in Free, plus…",
  "Streak Freeze for life's off-days",
  "Mascot hats, shades & duvets",
  "Score history & weekly trends",
  "App blocking until your bed is made",
  "Couples mode for you & your partner",
  "Bigger squads + custom nudges",
];

const PLANS = {
  annual: { price: "$30", per: "/yr", sub: "just $2.50/mo, billed yearly" },
  monthly: { price: "$3.99", per: "/mo", sub: "billed monthly" },
} as const;

type Billing = keyof typeof PLANS;

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("annual");
  const plan = PLANS[billing];

  return (
    <section id="pricing" className={styles.section} aria-labelledby="pricing-title">
      <SectionHeading
        eyebrow="Pricing"
        title="Free to start. Pro to soar."
        titleId="pricing-title"
        subcopy="The whole ritual is free forever. Upgrade when you want to protect your streak and dress up BedBuddy."
      />

      <div className={styles.toggle} role="group" aria-label="Billing period">
        <button
          type="button"
          className={styles.toggleBtn}
          data-active={billing === "annual"}
          aria-pressed={billing === "annual"}
          onClick={() => setBilling("annual")}
        >
          Annual
        </button>
        <button
          type="button"
          className={styles.toggleBtn}
          data-active={billing === "monthly"}
          aria-pressed={billing === "monthly"}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
      </div>

      <div className={styles.cards}>
        {/* Free */}
        <div className={styles.free}>
          <div className={`font-display ${styles.planName}`}>Free</div>
          <div className={styles.priceRow}>
            <span className={`font-display ${styles.price}`}>$0</span>
            <span className={styles.per}>forever</span>
          </div>
          <div className={styles.divider} />
          <ul className={styles.list}>
            {FREE_FEATURES.map((f) => (
              <li key={f} className={styles.item}>
                <span className={`${styles.check} ${styles.checkFree}`}>
                  <Check weight="bold" size={13} color="var(--color-mint)" aria-hidden />
                </span>
                <span className={styles.itemText}>{f}</span>
              </li>
            ))}
          </ul>
          <a href={APP_STORE_URL} className={`${styles.ctaFree} press`}>
            Download free
          </a>
        </div>

        {/* Pro */}
        <div className={styles.pro}>
          <div className={styles.ribbon}>SAVE 37%</div>
          <div className={`font-display ${styles.proName}`}>
            <Crown weight="fill" size={20} color="var(--color-sunshine)" aria-hidden />
            Bedly Pro
          </div>
          <div className={styles.priceRow}>
            <span className={`font-display ${styles.priceWhite}`}>{plan.price}</span>
            <span className={styles.perWhite}>{plan.per}</span>
          </div>
          <div className={styles.proSub}>{plan.sub}</div>
          <div className={styles.dividerPro} />
          <ul className={styles.list}>
            {PRO_FEATURES.map((f) => (
              <li key={f} className={styles.item}>
                <span className={`${styles.check} ${styles.checkPro}`}>
                  <Check weight="bold" size={13} color="var(--color-coral)" aria-hidden />
                </span>
                <span className={styles.itemTextWhite}>{f}</span>
              </li>
            ))}
          </ul>
          <a href={APP_STORE_URL} className={`${styles.ctaPro} press`}>
            Start 7-day free trial
          </a>
          <div className={styles.trialNote}>
            Then {plan.price}
            {plan.per} · cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
}
