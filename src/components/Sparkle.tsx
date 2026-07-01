import type { CSSProperties } from "react";

export interface SparkleProps {
  size: number;
  color: string;
  /** Absolute position offsets (any subset). */
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  twinkle?: boolean;
  duration?: number;
  delay?: number;
  style?: CSSProperties;
}

/** Decorative 4-point star accent (clip-path). Hidden from assistive tech. */
export default function Sparkle({
  size,
  color,
  top,
  left,
  right,
  bottom,
  twinkle = true,
  duration = 3,
  delay = 0,
  style,
}: SparkleProps) {
  return (
    <span
      aria-hidden="true"
      className={`sparkle${twinkle ? " anim-twinkle" : ""}`}
      style={{
        position: "absolute",
        width: size,
        height: size,
        background: color,
        top,
        left,
        right,
        bottom,
        animationDuration: twinkle ? `${duration}s` : undefined,
        animationDelay: twinkle ? `${delay}s` : undefined,
        ...style,
      }}
    />
  );
}
