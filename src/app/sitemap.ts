import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-30");
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/support", priority: 0.8 },
    { path: "/privacy", priority: 0.5 },
    { path: "/terms", priority: 0.5 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
