import Link from "next/link";
import { AppleLogo } from "@phosphor-icons/react/dist/ssr";
import AppIconMark from "./AppIconMark";
import Wordmark from "./Wordmark";
import MobileMenu, { type NavLink } from "./MobileMenu";
import styles from "./SiteNav.module.css";

const LINKS: NavLink[] = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "/support" },
];

/** Full translucent sticky nav used on the landing page. */
export default function SiteNav() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={`${styles.brand} press`} aria-label="Bedly home">
          <AppIconMark />
          <Wordmark />
        </Link>

        <div className={styles.desktop}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`${styles.link} press`}>
              {l.label}
            </Link>
          ))}
          <Link href="#get" className={`${styles.download} press`}>
            <AppleLogo weight="fill" size={17} aria-hidden />
            Download
          </Link>
        </div>

        <MobileMenu links={LINKS} />
      </div>
    </header>
  );
}
