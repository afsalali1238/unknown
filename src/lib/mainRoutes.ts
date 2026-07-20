/**
 * Single source of truth for the app's top-level, statically-routable
 * destinations. Reused by BottomNav (so every tab lives here) and by
 * useOfflineWarmup (so a destination can't silently go missing from the
 * offline precache list without also disappearing from the nav - the exact
 * bug that shipped once already, see useOfflineWarmup.ts).
 *
 * To add a new top-level tab: add it here first, then BottomNav picks it up
 * automatically and useOfflineWarmup's document list stays correct by
 * construction instead of by remembering to update a second array by hand.
 */
export const MAIN_TABS = [
  {
    to: "/" as const,
    label: "Feed",
    match: (p: string) => p === "/" || p.startsWith("/node"),
  },
  {
    to: "/skim" as const,
    label: "Skim",
    match: (p: string) => p.startsWith("/skim") || p.startsWith("/map"),
  },
  {
    to: "/explore" as const,
    label: "Explore",
    match: (p: string) => p.startsWith("/explore"),
  },
  {
    to: "/you" as const,
    label: "You",
    match: (p: string) => p.startsWith("/you"),
  },
] as const;

export const MAIN_TAB_PATHS = MAIN_TABS.map((t) => t.to);
