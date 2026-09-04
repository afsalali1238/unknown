import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { MAIN_TABS } from "@/lib/mainRoutes";
import { useStore, dueCount } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const { pathname } = useLocation();
  const tabs = MAIN_TABS;
  // Gate on hydration so the badge never renders a server-side 0 and then
  // flashes to the real count; before hydration it's simply absent.
  const hydrated = useHydrated();
  const review = useStore((s) => s.review);
  const due = hydrated ? dueCount(review) : 0;

  // One beat on the badge whenever the count goes *up* (an answer just
  // scheduled something), never on the way down — the reader is already
  // looking at Review when it decreases.
  // (0 → n is the badge mounting, which `pop` already animates; hydration
  // also lands here, and that's not an event worth a beat.)
  const prevDue = useRef(due);
  const [beat, setBeat] = useState(false);
  useEffect(() => {
    const prev = prevDue.current;
    prevDue.current = due;
    if (due > prev && prev !== 0) {
      setBeat(true);
      const t = setTimeout(() => setBeat(false), 500);
      return () => clearTimeout(t);
    }
  }, [due]);

  return (
    <nav
      data-vt="nav"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-line bg-paper/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-2xl">
        {tabs.map((t) => {
          const active = t.match(pathname);
          const badge = "badge" in t && t.badge === "due" && due > 0 ? due : 0;
          return (
            <Link
              key={t.to}
              to={t.to}
              aria-label={badge ? `${t.label}, ${badge} due` : t.label}
              aria-current={active ? "page" : undefined}
              className="group relative flex flex-1 flex-col items-center justify-center gap-1 py-3 min-h-14"
            >
              <span className="relative inline-flex items-center">
                <span
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-[var(--duration-fast)]",
                    active ? "text-accent" : "text-ink-soft group-hover:text-ink",
                  )}
                >
                  {t.label}
                </span>
                {badge > 0 && (
                  // Quiet numerals, no flame — UX-WORKFLOW-PROPOSAL §5. Sits
                  // just outside the label so tab widths don't shift as the
                  // count changes.
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pop absolute -right-4 -top-2 min-w-4 rounded-full bg-accent px-1 text-center font-mono text-[9px] leading-4 text-paper",
                      beat && "pulse-beat",
                    )}
                  >
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </span>
              {/* The active rule slides between tabs rather than blinking:
                  it's one element per tab, but scaleX from the centre with
                  the same easing reads as a single moving line. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-6 top-0 h-px origin-center bg-accent transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]",
                  active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          );
        })}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
