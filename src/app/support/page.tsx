import type { Metadata } from "next";
import {
  EnvelopeSimple,
  Clock,
  PaperPlaneTilt,
} from "@phosphor-icons/react/dist/ssr";
import { LegalNav, CrossLinks } from "@/components/LegalChrome";
import BedBuddy from "@/components/BedBuddy";
import Sparkle from "@/components/Sparkle";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { FAQS } from "@/content/faq";
import { MAILTO, SUPPORT_EMAIL } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import styles from "./support.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Support & FAQ",
  description:
    "Bedly help center. Answers to the questions people ask most — the AI bed score, photo storage, streaks, Bedly Pro, squads, supported devices — plus a friendly human at hello@bedly.app.",
  path: "/support",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SupportPage() {
  return (
    <>
      <LegalNav />
      <main>
        {/* Hero */}
        <section className={styles.hero} aria-labelledby="support-title">
          <Sparkle size={18} color="#FFCB2D" top={50} left="12%" twinkle={false} style={{ opacity: 0.9 }} />
          <Sparkle size={14} color="#fff" top={120} right="14%" twinkle={false} style={{ opacity: 0.85 }} />
          <div className={styles.heroInner}>
            <div className={styles.mascot}>
              <BedBuddy mood="happy" scale={0.727} />
            </div>
            <h1 id="support-title" className={`font-display ${styles.heroTitle}`}>
              How can we help?
            </h1>
            <p className={styles.heroSub}>
              Answers to the things people ask us most — and a friendly human when you
              need one.
            </p>
          </div>
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className={styles.wave}
            aria-hidden="true"
          >
            <path d="M0,60 L0,28 C360,2 1080,2 1440,28 L1440,60 Z" fill="#FFF3EA" />
          </svg>
        </section>

        {/* Contact cards */}
        <div className={styles.contactWrap}>
          <div className={styles.contactRow}>
            <a href={MAILTO} className={`${styles.contactCard} press`}>
              <span
                className={styles.contactTile}
                style={{ background: "var(--grad-coral)", boxShadow: "0 8px 16px rgba(255,94,74,.28)" }}
              >
                <EnvelopeSimple weight="fill" size={24} color="#fff" aria-hidden />
              </span>
              <span>
                <span className={styles.contactTitle} style={{ display: "block" }}>
                  Email us
                </span>
                <span className={styles.contactSub}>{SUPPORT_EMAIL}</span>
              </span>
            </a>
            <div className={styles.contactCard}>
              <span
                className={styles.contactTile}
                style={{ background: "var(--grad-mint)", boxShadow: "0 8px 16px rgba(33,201,151,.28)" }}
              >
                <Clock weight="fill" size={24} color="#fff" aria-hidden />
              </span>
              <span>
                <span className={styles.contactTitle} style={{ display: "block" }}>
                  Quick replies
                </span>
                <span className={styles.contactSub}>Usually within one business day</span>
              </span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className={styles.faqWrap} aria-labelledby="faq-heading">
          <h2 id="faq-heading" className={`font-display ${styles.faqHeading}`}>
            Frequently asked questions
          </h2>
          <FaqAccordion />

          <div className={styles.stuck}>
            <h2 className={`font-display ${styles.stuckTitle}`}>
              Still tangled in the sheets?
            </h2>
            <p className={styles.stuckSub}>
              Drop us a line and a real person will untangle it with you.
            </p>
            <a href={MAILTO} className={`${styles.stuckBtn} press`}>
              <PaperPlaneTilt weight="fill" size={18} aria-hidden />
              Email {SUPPORT_EMAIL}
            </a>
          </div>

          <CrossLinks
            links={[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Back to home", href: "/", home: true },
            ]}
          />
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
