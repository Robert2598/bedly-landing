/**
 * Central site configuration. Single source of truth for URLs, contact info,
 * and the (not-yet-live) App Store details so they can be swapped in one place.
 */

export const SITE_URL = "https://bedly.app";

export const SITE_NAME = "Bedly";
export const SITE_TAGLINE = "Make your bed. Make your day.";
export const SITE_DESCRIPTION =
  "Bedly is the playful make-your-bed habit app. Scan your bed, get an AI score 0–100, build a streak, and rally your squad. Free to start on iPhone.";

export const SUPPORT_EMAIL = "hello@bedly.app";
export const MAILTO = `mailto:${SUPPORT_EMAIL}`;

export const LEGAL_ENTITY = "PixelPaw SRL";
export const LEGAL_LOCATION = "Bucharest, Romania";
export const COPYRIGHT_YEAR = "2026";
export const LAST_UPDATED = "30 June 2026";

/**
 * The numeric App Store ID for the live listing. Every download CTA points to
 * {@link APP_STORE_URL} and the Smart App Banner `apple-itunes-app` meta tag is
 * emitted from this. If set back to `null`, the buttons fall back to the `#get`
 * anchor and the banner is omitted (keeping the site truthful pre-launch).
 *
 * Region-agnostic form (`apps.apple.com/app/id<ID>`) is used deliberately: it
 * redirects each visitor to their own local App Store storefront, rather than
 * pinning everyone to the storefront in the pasted link (e.g. `/no/`).
 */
export const APP_STORE_ID: string | null = "6757679277";

export const APP_STORE_URL = APP_STORE_ID
  ? `https://apps.apple.com/app/id${APP_STORE_ID}`
  : "#get";
