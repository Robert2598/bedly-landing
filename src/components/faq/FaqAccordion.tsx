"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { FAQS } from "@/content/faq";
import styles from "./FaqAccordion.module.css";

/** One-open-at-a-time accordion. Keyboard + ARIA; smooth grid-rows height. */
export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={styles.list}>
      {FAQS.map((f, i) => {
        const open = i === openIndex;
        return (
          <div key={f.q} className={styles.item}>
            <h3 className={styles.qWrap}>
              <button
                type="button"
                id={`faq-q-${i}`}
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpenIndex(open ? -1 : i)}
              >
                <span className={styles.q}>{f.q}</span>
                <span className={styles.caret} data-open={open} aria-hidden>
                  <CaretDown weight="fill" size={15} color="var(--color-coral)" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              className={styles.panel}
              data-open={open}
            >
              <div className={styles.panelInner}>
                <p className={styles.answer}>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
