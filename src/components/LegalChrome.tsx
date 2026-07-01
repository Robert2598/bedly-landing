import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import AppIconMark from "./AppIconMark";
import Wordmark from "./Wordmark";
import styles from "./LegalChrome.module.css";

/** Minimal sticky nav for legal + support pages. */
export function LegalNav() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={`${styles.brand} press`} aria-label="Bedly home">
          <AppIconMark size={36} radius={10} mascotScale={0.16} />
          <Wordmark size={21} />
        </Link>
        <Link href="/" className={`${styles.back} press`}>
          <ArrowLeft weight="fill" size={15} aria-hidden />
          Back to home
        </Link>
      </div>
    </header>
  );
}

export interface CrossLink {
  label: string;
  href: string;
  home?: boolean;
}

/** Centered cross-link row used as the simple footer on legal + support pages. */
export function CrossLinks({ links }: { links: CrossLink[] }) {
  return (
    <nav className={styles.crosslinks} aria-label="More pages">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`${styles.crosslink}${l.home ? ` ${styles.crosslinkHome}` : ""} press`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
