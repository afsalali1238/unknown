import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";

// Applies the user's theme choice (light/dark/system) to <html class="dark">
// so Tailwind's `dark:` variant (declared as
// `@custom-variant dark (&:is(.dark *));` in styles.css) picks it up, and
// keeps the PWA chrome color (browser UI / status bar tint) in sync too.
// Runs only after hydration — the persisted choice loads asynchronously
// from IndexedDB (see src/lib/store.ts), so applying a theme before that
// resolves would just apply the "system" default and then flash to the
// real choice a moment later.
export function useThemeSync() {
  const theme = useStore((s) => s.theme);
  const hydrated = useHydrated();

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;

    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    function apply() {
      const resolved = theme === "system" ? (media.matches ? "dark" : "light") : theme;
      root.classList.toggle("dark", resolved === "dark");
      themeColorMeta?.setAttribute("content", resolved === "dark" ? "#1c1a17" : "#fcfbf9");
    }

    apply();

    if (theme === "system") {
      media.addEventListener("change", apply);
      return () => media.removeEventListener("change", apply);
    }
  }, [theme, hydrated]);
}
