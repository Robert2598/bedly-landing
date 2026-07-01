import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Make your bed. Make your day.`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#FFF3EA",
    theme_color: "#FFF3EA",
    icons: [
      { src: "/bedly-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/bedly-icon-1024.png", sizes: "1024x1024", type: "image/png", purpose: "any" },
    ],
  };
}
