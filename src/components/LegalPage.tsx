import type { ReactNode } from "react";
import { Info } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { LegalNav, CrossLinks, type CrossLink } from "./LegalChrome";
import styles from "./LegalPage.module.css";

export interface LegalRow {
  icon: Icon;
  color: string;
  bg: string;
  title: string;
  body: string;
}

export type LegalSection =
  | { kind: "text"; n: number; title: string; body: ReactNode }
  | { kind: "rows"; n: number; title: string; rows: LegalRow[] };

export interface LegalPageProps {
  badge: { icon: Icon; label: string; color: string };
  title: string;
  dateLine: string;
  summary: ReactNode;
  intro: ReactNode;
  sections: LegalSection[];
  crossLinks: CrossLink[];
}

/** Shared layout for the Terms + Privacy pages. */
export default function LegalPage({
  badge,
  title,
  dateLine,
  summary,
  intro,
  sections,
  crossLinks,
}: LegalPageProps) {
  const BadgeIcon = badge.icon;
  return (
    <>
      <LegalNav />
      <main>
        <div className={styles.headerBlock}>
          <div className={styles.badge} style={{ color: badge.color }}>
            <BadgeIcon weight="fill" size={14} aria-hidden />
            {badge.label}
          </div>
          <h1 className={`font-display ${styles.title}`}>{title}</h1>
          <p className={styles.date}>{dateLine}</p>
          <div className={styles.summary}>{summary}</div>
        </div>

        <div className={styles.bodyBlock}>
          <article className={styles.card}>
            <p className={styles.intro}>{intro}</p>
            <div className={styles.divider} />

            {sections.map((s, i) => (
              <section key={s.n}>
                <h2
                  className={`font-display ${styles.sectionTitle}${
                    i === 0 ? ` ${styles.sectionTitleFirst}` : ""
                  }`}
                >
                  {s.n}. {s.title}
                </h2>
                {s.kind === "text" ? (
                  <p className={styles.sectionBody}>{s.body}</p>
                ) : (
                  <div className={styles.rows}>
                    {s.rows.map((r) => {
                      const RowIcon = r.icon;
                      return (
                        <div key={r.title} className={styles.row}>
                          <div className={styles.rowIcon} style={{ background: r.bg }}>
                            <RowIcon weight="fill" size={17} color={r.color} aria-hidden />
                          </div>
                          <div>
                            <div className={styles.rowTitle}>{r.title}</div>
                            <div className={styles.rowBody}>{r.body}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            ))}

            <div className={styles.footnote}>
              <Info
                weight="fill"
                size={16}
                color="var(--color-coral)"
                style={{ flex: "none", marginTop: 1 }}
                aria-hidden
              />
              <span>
                This document is a starting draft for review by qualified legal counsel
                before publication. It is not legal advice.
              </span>
            </div>
          </article>

          <CrossLinks links={crossLinks} />
        </div>
      </main>
    </>
  );
}
