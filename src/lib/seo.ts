import type { Metadata } from "next";
import { SITE_NAME } from "./config";

/**
 * Per-route metadata for inner pages. Next.js does NOT backfill `openGraph`
 * (or `twitter`) from a page's `title`/`description`, so without this the
 * inner routes would inherit the homepage social card. This sets a correct
 * canonical + Open Graph + Twitter card per page. The root file-based
 * `opengraph-image` still supplies og:image / twitter:image for every route.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`;
  // The root file-based opengraph-image is not re-merged when a page defines
  // its own openGraph, so reference it explicitly to keep every route's card.
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: fullTitle,
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: "website",
      siteName: SITE_NAME,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
