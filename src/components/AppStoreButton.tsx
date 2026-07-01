import { AppleLogo } from "@phosphor-icons/react/dist/ssr";
import { APP_STORE_URL } from "@/lib/config";

export interface AppStoreButtonProps {
  height?: number;
  appleSize?: number;
  labelSize?: number;
  pulse?: boolean;
  className?: string;
}

/**
 * Black two-line "Download on the / App Store" button. Always an <a> (SEO);
 * points at the real App Store URL once configured, otherwise the #get anchor.
 */
export default function AppStoreButton({
  height = 60,
  appleSize = 30,
  labelSize = 20,
  pulse = false,
  className,
}: AppStoreButtonProps) {
  return (
    <a
      href={APP_STORE_URL}
      aria-label="Download Bedly on the App Store"
      className={`press${pulse ? " anim-cta-pulse" : ""}${className ? ` ${className}` : ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 11,
        height,
        padding: "0 24px",
        borderRadius: 17,
        background: "var(--color-dark-ui)",
        textDecoration: "none",
        color: "#fff",
        boxShadow: "0 14px 30px rgba(0,0,0,.24)",
      }}
    >
      <AppleLogo weight="fill" size={appleSize} color="#fff" aria-hidden />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.85 }}>
          Download on the
        </span>
        <span
          className="font-display"
          style={{ fontWeight: 600, fontSize: labelSize, marginTop: 3 }}
        >
          App Store
        </span>
      </span>
    </a>
  );
}
