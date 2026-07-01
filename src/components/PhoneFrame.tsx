import type { CSSProperties, ReactNode } from "react";
import styles from "./PhoneFrame.module.css";

export interface PhoneFrameProps {
  width: number;
  height: number;
  bezelRadius?: number;
  padding?: number;
  screenRadius?: number;
  notch?: boolean;
  shadow?: string;
  screenBackground?: string;
  screenPadding?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Reusable iPhone bezel. The global border-box reset keeps the inner screen
 * (height:100% + its own padding) *inside* the bezel — the documented fix for
 * the gradient-bleed bug. The whole frame is decorative product art, so it is
 * aria-hidden; section copy carries the real meaning.
 */
export default function PhoneFrame({
  width,
  height,
  bezelRadius = 42,
  padding = 11,
  screenRadius = 32,
  notch = false,
  shadow = "0 40px 80px rgba(42,33,64,.4)",
  screenBackground = "var(--color-cream)",
  screenPadding,
  children,
  className,
  style,
}: PhoneFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.bezel}${className ? ` ${className}` : ""}`}
      style={{
        width,
        height,
        borderRadius: bezelRadius,
        padding,
        boxShadow: shadow,
        ...style,
      }}
    >
      {notch && <div className={styles.notch} />}
      <div
        className={styles.screen}
        style={{
          borderRadius: screenRadius,
          background: screenBackground,
          padding: screenPadding,
        }}
      >
        {children}
      </div>
    </div>
  );
}
