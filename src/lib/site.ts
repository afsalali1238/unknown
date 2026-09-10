// Central site/app identity. P0.2 (rename sweep) changes APP_NAME here and in
// user-visible strings; code imports this instead of hardcoding the name.
/** Display name. TODO(P0.2): replace with final name once owner confirms (see docs/BRAND.md). */
export const APP_NAME = "Unknown";
export const APP_TAGLINE = "A latticework of powerful ideas";
/**
 * Support contact. Empty = not configured yet; UI falls back to a
 * "coming soon" note instead of rendering a fake address.
 * TODO(P1): owner — set a real support email before public launch.
 */
export const CONTACT_EMAIL = "";
