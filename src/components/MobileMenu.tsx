"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { List, X, AppleLogo } from "@phosphor-icons/react/dist/ssr";
import { APP_STORE_URL } from "@/lib/config";
import styles from "./SiteNav.module.css";

export interface NavLink {
  label: string;
  href: string;
}

/** Hamburger disclosure for the landing nav below 720px. Keyboard + ARIA. */
export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <div className={styles.mobileWrap} ref={containerRef}>
      <button
        type="button"
        className={`${styles.menuButton} press`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X weight="bold" size={22} /> : <List weight="bold" size={22} />}
      </button>

      <div
        id={panelId}
        className={styles.panel}
        data-open={open}
        hidden={!open}
      >
        <nav aria-label="Primary" className={styles.panelInner}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.panelLink}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={APP_STORE_URL}
            className={`${styles.panelCta} press`}
            aria-label="Download Bedly on the App Store"
            onClick={() => setOpen(false)}
          >
            <AppleLogo weight="fill" size={17} aria-hidden />
            Download
          </a>
        </nav>
      </div>
    </div>
  );
}
