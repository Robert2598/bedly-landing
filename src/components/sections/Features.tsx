import type { Icon } from "@phosphor-icons/react";
import {
  Sparkle,
  ShieldCheck,
  UsersThree,
  Medal,
  Bell,
  Smiley,
} from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import styles from "./Features.module.css";

interface Feature {
  title: string;
  body: string;
  icon: Icon;
  gradient: string;
  shadow: string;
}

const FEATURES: Feature[] = [
  {
    title: "AI bed scoring",
    body: "A friendly model rates fluff, corners and pillow game 0–100 — and tells you how to do better.",
    icon: Sparkle,
    gradient: "var(--grad-coral)",
    shadow: "0 9px 18px rgba(255,94,74,.28)",
  },
  {
    title: "Streaks & freezes",
    body: "Keep your chain alive every morning. Pro's Streak Freeze saves your day when life gets in the way.",
    icon: ShieldCheck,
    gradient: "var(--grad-gold)",
    shadow: "0 9px 18px rgba(255,176,32,.3)",
  },
  {
    title: "Squads & nudges",
    body: "Add your friends, climb the leaderboard, and send a loving nudge to whoever's still under the covers.",
    icon: UsersThree,
    gradient: "var(--grad-grape)",
    shadow: "0 9px 18px rgba(142,91,224,.3)",
  },
  {
    title: "Sticker achievements",
    body: "Collect playful badges for every milestone, from your First Make to the elusive Perfect 100.",
    icon: Medal,
    gradient: "var(--grad-mint)",
    shadow: "0 9px 18px rgba(33,201,151,.3)",
  },
  {
    title: "Gentle reminders",
    body: "One kind nudge each morning, at the time you choose. No nagging, no notification spam.",
    icon: Bell,
    gradient: "var(--grad-sky)",
    shadow: "0 9px 18px rgba(52,174,224,.3)",
  },
  {
    title: "BedBuddy moods",
    body: "Your mascot reacts to your progress — and with Pro, dresses up in hats, shades and duvet colors.",
    icon: Smiley,
    gradient: "var(--grad-pink)",
    shadow: "0 9px 18px rgba(255,93,152,.3)",
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.section} aria-labelledby="features-title">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to keep the streak"
          titleId="features-title"
        />
        <ul className={styles.grid}>
          {FEATURES.map(({ title, body, icon: Icon, gradient, shadow }) => (
            <li key={title} className={styles.card}>
              <div
                className={styles.tile}
                style={{ background: gradient, boxShadow: shadow }}
              >
                <Icon weight="fill" size={27} color="#fff" aria-hidden />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardBody}>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
