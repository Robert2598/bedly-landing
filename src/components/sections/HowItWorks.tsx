import type { Icon } from "@phosphor-icons/react";
import {
  Camera,
  SealCheck,
  LockKeyOpen,
  Fire,
} from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import styles from "./HowItWorks.module.css";

interface Step {
  n: number;
  title: string;
  body: string;
  icon: Icon;
  iconSize: number;
  gradient: string;
  shadow: string;
}

const STEPS: Step[] = [
  {
    n: 1,
    title: "Scan your bed",
    body: "Point your camera at your freshly-made bed. BedBuddy's AI checks the pillows, corners and fluff in seconds.",
    icon: Camera,
    iconSize: 30,
    gradient: "var(--grad-sky)",
    shadow: "0 10px 20px rgba(52,174,224,.32)",
  },
  {
    n: 2,
    title: "Get your score",
    body: "A 0–100 rating lands instantly, with friendly tips to level up tomorrow. Hospital corners? Chef's kiss.",
    icon: SealCheck,
    iconSize: 32,
    gradient: "var(--grad-mint)",
    shadow: "0 10px 20px rgba(33,201,151,.32)",
  },
  {
    n: 3,
    title: "Unlock your day",
    body: "Keep your most distracting apps — Instagram, TikTok, X — locked until your bed is made. Make it to earn your morning scroll.",
    icon: LockKeyOpen,
    iconSize: 30,
    gradient: "var(--grad-grape)",
    shadow: "0 10px 20px rgba(142,91,224,.32)",
  },
  {
    n: 4,
    title: "Build your streak",
    body: "Rack up points and climb your squad's leaderboard. Nudge the friends who are slacking. Lovingly.",
    icon: Fire,
    iconSize: 32,
    gradient: "var(--grad-coral)",
    shadow: "0 10px 20px rgba(255,94,74,.32)",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className={styles.section} aria-labelledby="how-title">
      <SectionHeading
        eyebrow="How it works"
        title="Four taps to a tidier you"
        titleId="how-title"
        subcopy="No spreadsheets, no guilt trips. Just a quick morning ritual that earns you the rest of your day."
      />
      <ol className={styles.grid}>
        {STEPS.map(({ n, title, body, icon: Icon, iconSize, gradient, shadow }) => (
          <li key={n} className={styles.card}>
            <span className={styles.watermark} aria-hidden>
              {n}
            </span>
            <div
              className={styles.tile}
              style={{ background: gradient, boxShadow: shadow }}
            >
              <Icon weight="fill" size={iconSize} color="#fff" aria-hidden />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardBody}>{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
