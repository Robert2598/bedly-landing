import styles from "./SectionHeading.module.css";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleId?: string;
  subcopy?: string;
}

/** Centered eyebrow + H2 + optional subcopy used across landing sections. */
export default function SectionHeading({
  eyebrow,
  title,
  titleId,
  subcopy,
}: SectionHeadingProps) {
  return (
    <div className={styles.head}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {subcopy && <p className={styles.sub}>{subcopy}</p>}
    </div>
  );
}
