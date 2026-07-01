import styles from "./StatBar.module.css";

const STATS: { value: string; label: string; color: string }[] = [
  { value: "0–100", label: "your daily bed score", color: "var(--color-coral)" },
  { value: "2 min", label: "to a better morning", color: "var(--color-grape)" },
  { value: "0", label: "photos stored", color: "var(--color-mint)" },
  { value: "Free", label: "to start, forever", color: "var(--color-sky)" },
];

export default function StatBar() {
  return (
    <div className={styles.wrap}>
      <dl className={styles.card}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.stat}>
            <dt className={`font-display ${styles.value}`} style={{ color: s.color }}>
              {s.value}
            </dt>
            <dd className={styles.label}>{s.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
