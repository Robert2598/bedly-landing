import BedBuddy from "./BedBuddy";

export interface AppIconMarkProps {
  size?: number;
  radius?: number;
  /** Mascot scale inside the mark (matches the prototype's ~0.16–0.17). */
  mascotScale?: number;
  shadow?: boolean;
}

/**
 * The Bedly app-icon mark: BedBuddy on the sunset gradient inside a rounded
 * square. Used in nav + footer. Decorative (BedBuddy is already aria-hidden).
 */
export default function AppIconMark({
  size = 38,
  radius = 11,
  mascotScale = 0.17,
  shadow = true,
}: AppIconMarkProps) {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: size,
        height: size,
        borderRadius: radius,
        background: "var(--grad-sunset-mark)",
        overflow: "hidden",
        flex: "none",
        boxShadow: shadow ? "0 5px 12px rgba(255,111,94,.34)" : undefined,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <BedBuddy mood="happy" scale={mascotScale} />
      </span>
    </span>
  );
}
