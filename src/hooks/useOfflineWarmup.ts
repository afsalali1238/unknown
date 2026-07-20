import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { NODES } from "@/data/nodes";
import { MAIN_TAB_PATHS } from "@/lib/mainRoutes";

/**
 * Once the service worker is controlling the page, silently warm the
 * offline cache for the whole app - not just the pages the user has
 * already opened - so an installed/offline launch works right away.
 *
 * Two things need warming, for two different reasons:
 * 1. Each route's server-rendered HTML document (`fetch(url)`). This is
 *    what a fresh navigation needs - most importantly "/", since that's
 *    the PWA's start_url and is what loads when the installed app icon is
 *    opened. The very first time someone ever visits the site, that
 *    request happens *before* any service worker exists, so it's never
 *    cached unless we explicitly refetch it once the worker is active.
 * 2. Each route's JS chunk (`router.preloadRoute`), so that once "/" has
 *    loaded, navigating to any other page is a client-side transition
 *    that doesn't need the network at all.
 *
 * Node content itself (all layers, quizzes, related links, sources) is
 * static data bundled into the JS, not fetched per-node, so there's
 * nothing to warm per node id: every `/node/$id` URL is served by the
 * same route chunk. Warming it once (with any valid id) is enough to
 * make every node page available offline. The archive reader
 * (`/read/$id`) is the one screen that *does* fetch per-item content (the
 * markdown source file itself), so its route chunk gets the same
 * one-time warm as the other tabs; the individual .md files are cached
 * lazily by the service worker's stale-while-revalidate rule the first
 * time each one is actually opened.
 */
export function useOfflineWarmup() {
  const router = useRouter();

  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    if (navigator.onLine === false) return;

    let cancelled = false;

    async function warm() {
      try {
        // Wait until a service worker is actually active and controlling
        // fetches - warming before that would just hit the network
        // without landing in our offline cache.
        await navigator.serviceWorker.ready;
      } catch {
        return;
      }
      if (cancelled) return;

      const firstNodeId = NODES[0]?.id;
      // Every bottom-nav tab, sourced from MAIN_TABS (see lib/mainRoutes.ts)
      // instead of a second hand-maintained list - a tab going missing here
      // was exactly how Skim and Explore fell out of the offline precache
      // once already. "/review" isn't a bottom-nav tab but is still a
      // primary destination (linked from You), so it's added on top.
      const documentUrls: string[] = [...MAIN_TAB_PATHS, "/review"];
      if (firstNodeId) documentUrls.push(`/node/${firstNodeId}`);

      for (const url of documentUrls) {
        if (cancelled) return;
        await fetch(url, { credentials: "same-origin" }).catch(() => {});
      }

      for (const to of MAIN_TAB_PATHS) {
        if (cancelled) return;
        await router.preloadRoute({ to }).catch(() => {});
      }
      if (cancelled) return;
      await router.preloadRoute({ to: "/review" }).catch(() => {});
      if (cancelled) return;
      if (firstNodeId) {
        await router.preloadRoute({ to: "/node/$id", params: { id: firstNodeId } }).catch(() => {});
      }
      const firstArchived = NODES.flatMap((n) => n.furtherReading)
        .find((f) => f.archive?.status === "full" && f.archive.path)
        ?.archive?.path?.replace(/^content\/sources\//, "")
        .replace(/\.md$/, "");
      if (firstArchived) {
        await router
          .preloadRoute({ to: "/read/$id", params: { id: firstArchived } })
          .catch(() => {});
      }
    }

    // Give the initial page its own bandwidth before warming the rest.
    const timer = window.setTimeout(warm, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [router]);
}
