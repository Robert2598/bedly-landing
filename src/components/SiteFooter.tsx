import Link from "next/link";
import AppIconMark from "./AppIconMark";
import Wordmark from "./Wordmark";
import styles from "./SiteFooter.module.css";
import {
  MAILTO,
  SUPPORT_EMAIL,
  LEGAL_ENTITY,
  LEGAL_LOCATION,
  COPYRIGHT_YEAR,
} from "@/lib/config";

const COLUMNS: { head: string; links: { label: string; href: string }[] }[] = [
  {
    head: "Product",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "Support & FAQ", href: "/support" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/** Dark landing-page footer. Legal/support pages use the simpler LegalChrome footer. */
export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <div className={styles.brandRow}>
            <AppIconMark size={36} radius={10} shadow={false} mascotScale={0.16} />
            <Wordmark size={21} />
          </div>
          <p className={styles.blurb}>
            The playful habit tracker that turns making your bed into your favorite
            part of the morning.
          </p>
          <div className={styles.signature}>Made with rumpled love.</div>
        </div>

        <div className={styles.cols}>
          {COLUMNS.map((col) => (
            <div key={col.head}>
              <div className={styles.colHead}>{col.head}</div>
              <div className={styles.colLinks}>
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} className={`${styles.colLink} press`}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div className={styles.colHead}>Say hi</div>
            <div className={styles.colLinks}>
              <a href={MAILTO} className={`${styles.colLink} press`}>
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <div className={styles.fine}>
            © {COPYRIGHT_YEAR} {LEGAL_ENTITY}. All rights reserved.
          </div>
          <div className={styles.fine}>{LEGAL_LOCATION}</div>
        </div>
      </div>
    </footer>
  );
}
