import type { ReactNode } from "react";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";

/**
 * A small, dismissible, one-time explanation of a mechanic - shown inline,
 * in place, the first time a user reaches the moment it matters. The
 * tag-picker onboarding only asks what a user is interested in; it never
 * explains how the app itself works (progressive layers, spaced
 * repetition, the Leitner queue). These hints fill that gap contextually
 * instead of front-loading a tutorial nobody asked for.
 *
 * Persisted per-id in the store (`seenHints`), so once dismissed - or once
 * superseded by the action it was explaining, wherever the caller wires
 * that up - it never reappears, on this node or any other.
 */
export function FirstTimeHint({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const hydrated = useHydrated();
  const seen = useStore((s) => !!s.seenHints[id]);
  const dismissHint = useStore((s) => s.dismissHint);

  // Gate on hydrated: seenHints[id] reads as false until IndexedDB
  // hydration resolves, so rendering before that would flash the hint for
  // a user who already dismissed it in a previous session, then vanish.
  if (!hydrated || seen) return null;

  return (
    <div className={`border-l-2 border-accent bg-accent/5 p-3 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm leading-relaxed text-ink-soft">{children}</p>
        <button
          onClick={() => dismissHint(id)}
          className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-accent hover:underline"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
