import type { CSSProperties } from "react";

export interface WordmarkProps {
  size?: number;
  style?: CSSProperties;
  className?: string;
}

/** "Bedly." wordmark — Fredoka 700 with the period in sunshine yellow. */
export default function Wordmark({ size = 23, style, className }: WordmarkProps) {
  return (
    <span
      className={`font-display${className ? ` ${className}` : ""}`}
      style={{
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "-0.5px",
        lineHeight: 1,
        ...style,
      }}
    >
      Bedly<span style={{ color: "var(--color-sunshine)" }}>.</span>
    </span>
  );
}
