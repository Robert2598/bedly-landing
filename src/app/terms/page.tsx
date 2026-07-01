import type { Metadata } from "next";
import { Scroll } from "@phosphor-icons/react/dist/ssr";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { MAILTO, SUPPORT_EMAIL } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Bedly's Terms of Service — who can use the app, your account, the bed score, acceptable use, Bedly Pro billing, and governing law (Romania).",
  path: "/terms",
});

const SECTIONS: LegalSection[] = [
  {
    kind: "text",
    n: 1,
    title: "Who can use Bedly",
    body: "You must be at least 13 years old to use the Service. If you are under the age of majority in your country, you confirm that a parent or legal guardian has reviewed and agreed to these Terms on your behalf. By using Bedly you represent that you meet these requirements and that the information you provide is accurate.",
  },
  {
    kind: "text",
    n: 2,
    title: "Your account",
    body: "You can sign in with Apple or Google. You are responsible for any activity that happens under your account and for keeping your sign-in credentials secure. Let us know promptly at hello@bedly.app if you believe your account has been compromised. You may delete your account at any time from within the app.",
  },
  {
    kind: "text",
    n: 3,
    title: "The bed score is for fun",
    body: "Bedly uses an automated model to estimate a 0–100 “bed score” to motivate your habit. The score is an opinion generated for entertainment and encouragement only. It is not a measure of cleanliness, hygiene, health or any other objective fact, and you should not rely on it for any important decision.",
  },
  {
    kind: "text",
    n: 4,
    title: "Acceptable use",
    body: "When using Bedly, you agree not to: break any applicable law; harass, bully or send abusive nudges to other users; attempt to cheat, automate or manipulate scores, streaks or leaderboards; reverse-engineer, scrape or disrupt the Service; or upload content that is unlawful, hateful or infringes someone else's rights. We may suspend or terminate accounts that violate these rules.",
  },
  {
    kind: "text",
    n: 5,
    title: "Squads & social features",
    body: "Bedly lets you add friends, compare streaks and send playful “nudges”. Be respectful. Information you choose to share with a squad — such as your display name, streak and points — will be visible to the members of that squad. Only invite people you actually know.",
  },
  {
    kind: "text",
    n: 6,
    title: "Bedly Pro, trials & billing",
    body: "Bedly Pro is an optional auto-renewing subscription sold through the Apple App Store. Any free trial converts to a paid subscription unless you cancel at least 24 hours before the trial ends. Subscriptions renew automatically at the then-current price until cancelled. You manage, cancel and request refunds for purchases through your Apple ID account settings, subject to Apple's terms — we do not process payments directly.",
  },
  {
    kind: "text",
    n: 7,
    title: "Intellectual property",
    body: "The Service, including the BedBuddy mascot, artwork, text, software and branding, is owned by PixelPaw SRL and protected by intellectual-property laws. We grant you a personal, non-exclusive, non-transferable, revocable licence to use the app for your own non-commercial enjoyment. You may not copy, modify or redistribute any part of the Service without our written permission.",
  },
  {
    kind: "text",
    n: 8,
    title: "Disclaimers",
    body: "The Service is provided “as is” and “as available” without warranties of any kind, whether express or implied, to the fullest extent permitted by law. We do not guarantee that the Service will be uninterrupted, error-free, or that scores and streaks will always be accurate. Your statutory rights as a consumer are not affected.",
  },
  {
    kind: "text",
    n: 9,
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, PixelPaw SRL will not be liable for any indirect, incidental or consequential damages arising from your use of the Service. Nothing in these Terms limits liability that cannot be limited under applicable law, including liability for death or personal injury caused by negligence, or for fraud.",
  },
  {
    kind: "text",
    n: 10,
    title: "Changes to these Terms",
    body: "We may update these Terms from time to time. If we make material changes, we will notify you in the app or by email before they take effect. Continuing to use the Service after changes become effective means you accept the updated Terms.",
  },
  {
    kind: "text",
    n: 11,
    title: "Governing law",
    body: "These Terms are governed by the laws of Romania, without regard to conflict-of-laws principles. Subject to any mandatory consumer-protection rights you have in your country of residence, disputes will be handled by the competent courts of Romania.",
  },
  {
    kind: "text",
    n: 12,
    title: "Contact us",
    body: (
      <>
        Questions about these Terms? Email us any time at{" "}
        <a href={MAILTO}>{SUPPORT_EMAIL}</a>. We read every message.
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      badge={{ icon: Scroll, label: "Legal", color: "var(--color-coral)" }}
      title="Terms of Service"
      dateLine="Last updated 30 June 2026 · Effective immediately"
      summary={
        <>
          Plain-language summary: Bedly is a fun habit app for making your bed. Be kind,
          don’t abuse it, and remember the AI score is just for motivation. The full terms
          below are the binding version.
        </>
      }
      intro={
        <>
          These Terms of Service (“Terms”) govern your access to and use of the Bedly
          mobile application and related services (together, the “Service”), operated by
          PixelPaw SRL (“Bedly”, “we”, “us”), a company registered in Romania. By
          downloading, accessing or using the Service, you agree to be bound by these
          Terms. If you do not agree, please do not use the Service.
        </>
      }
      sections={SECTIONS}
      crossLinks={[
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Support & FAQ", href: "/support" },
        { label: "Back to home", href: "/", home: true },
      ]}
    />
  );
}
