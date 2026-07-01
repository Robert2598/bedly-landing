import type { Metadata } from "next";
import {
  LockKey,
  CameraSlash,
  User,
  ChartLineUp,
  Gear,
} from "@phosphor-icons/react/dist/ssr";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { MAILTO, SUPPORT_EMAIL } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Bedly's Privacy Policy. We never store photos of your bed — your scan is used only to calculate a score, then deleted. GDPR-compliant, data controller PixelPaw SRL.",
  path: "/privacy",
});

const SECTIONS: LegalSection[] = [
  {
    kind: "text",
    n: 1,
    title: "Bed photos are never stored",
    body: "When you scan your bed, the photo is used only to calculate your 0–100 score and is then deleted right away. We do not keep it, reuse it, or use it for anything else. The only thing we retain is the resulting number (and the time it was earned), so your streaks and points can sync.",
  },
  {
    kind: "rows",
    n: 2,
    title: "Information we do collect",
    rows: [
      {
        icon: User,
        color: "var(--color-coral)",
        bg: "#FFF0EB",
        title: "Account details",
        body: "When you sign in with Apple or Google we receive a unique identifier and, if you allow it, your name and email. We use this to create and secure your account.",
      },
      {
        icon: ChartLineUp,
        color: "var(--color-mint)",
        bg: "#EEF8F3",
        title: "Activity data",
        body: "Your scores, streaks, points, achievements and squad membership — the numbers that make the game work. No images, just stats.",
      },
      {
        icon: Gear,
        color: "var(--color-grape)",
        bg: "#F3EEFB",
        title: "Device & diagnostics",
        body: "Basic device type, app version and anonymous crash/usage logs so we can fix bugs and improve Bedly. This data is not used to identify you personally.",
      },
    ],
  },
  {
    kind: "text",
    n: 3,
    title: "How we use your information",
    body: "We use your information to run the core features (scores, streaks, leaderboards), to keep your data in sync across sessions, to send the reminders and nudges you opt into, to provide support, and to keep the Service secure and improve it. We do not sell your personal data, and we do not use your bed scans for advertising — because we don't keep them.",
  },
  {
    kind: "text",
    n: 4,
    title: "Legal bases (GDPR)",
    body: "We process your data to perform our contract with you (providing the Service), based on your consent (for optional notifications and analytics, which you can withdraw at any time), and on our legitimate interests in keeping Bedly safe, reliable and improving over time.",
  },
  {
    kind: "text",
    n: 5,
    title: "Who we share with",
    body: "We share data only with trusted service providers who help us operate Bedly — for example cloud hosting, the service that scans your bed to calculate a score, and analytics — under contracts that require them to protect it. Apple processes all Bedly Pro payments; we never see your card details. Members of a squad you join can see the profile details you choose to share, such as your display name, streak and points. We may also disclose data if required by law.",
  },
  {
    kind: "text",
    n: 6,
    title: "Data retention",
    body: "We keep your account and activity data for as long as your account is active. If you delete your account, we delete your personal data within 30 days, except where we must retain limited records to meet legal obligations. Bed photos, as noted, are never retained at all.",
  },
  {
    kind: "text",
    n: 7,
    title: "Your rights",
    body: "Under GDPR you have the right to access, correct, export or delete your personal data, to object to or restrict certain processing, and to withdraw consent at any time. You can delete your account directly in the app, or contact us at hello@bedly.app to exercise any of these rights. You also have the right to lodge a complaint with your local data-protection authority (in Romania, the ANSPDCP).",
  },
  {
    kind: "text",
    n: 8,
    title: "Children",
    body: "Bedly is not directed at children under 13, and we do not knowingly collect their personal data. If you believe a child has provided us with personal data, please contact us and we will delete it.",
  },
  {
    kind: "text",
    n: 9,
    title: "Changes to this policy",
    body: "If we update this policy, we'll change the date at the top and, for material changes, let you know in the app or by email before they take effect.",
  },
  {
    kind: "text",
    n: 10,
    title: "Contact us",
    body: (
      <>
        For any privacy question or request, reach our team at{" "}
        <a href={MAILTO}>{SUPPORT_EMAIL}</a>.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      badge={{ icon: LockKey, label: "Your privacy", color: "var(--color-grape)" }}
      title="Privacy Policy"
      dateLine="Last updated 30 June 2026"
      summary={
        <>
          <CameraSlash
            weight="fill"
            size={16}
            color="var(--color-mint)"
            style={{ display: "inline-block", verticalAlign: "-2px", marginRight: 6 }}
            aria-hidden
          />
          <strong>We never store photos of your bed.</strong> Your scan is used only to
          calculate a score, then deleted right away. We keep only the number.
        </>
      }
      intro={
        <>
          This Privacy Policy explains how PixelPaw SRL (“Bedly”, “we”, “us”), a company
          registered in Romania, handles your information when you use the Bedly app. We
          are the data controller for your personal data and we follow the EU General
          Data Protection Regulation (GDPR). We’ve tried to keep this human-readable.
        </>
      }
      sections={SECTIONS}
      crossLinks={[
        { label: "Terms of Service", href: "/terms" },
        { label: "Support & FAQ", href: "/support" },
        { label: "Back to home", href: "/", home: true },
      ]}
    />
  );
}
