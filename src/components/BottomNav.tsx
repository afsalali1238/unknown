import { Link, useLocation } from "@tanstack/react-router";
import { MAIN_TABS } from "@/lib/mainRoutes";
import { useStore, dueCount } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";

export function BottomNav() {
  const { pathname } = useLocation();
  const tabs = MAIN_TABS;
  // Gate on hydration so the badge never renders a server-side 0 and then
  // flashes to the real count; before hydration it's simply absent.
  const hydrated = useHydrated();
  const review = useStore((s) => s.review);
  const due = hydrated ? dueCount(review) : 0;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-line bg-paper/95 backdrop-blur">
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
              className="relative flex flex-1 flex-col items-center justify-center gap-1 py-3 min-h-14"
            >
              <span className="relative inline-flex items-center">
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                    active ? "text-accent" : "text-ink-soft"
                  }`}
                >
                  {t.label}
                </span>
                {badge > 0 && (
                  // Quiet numerals, no flame — UX-WORKFLOW-PROPOSAL §5. Sits
                  // just outside the label so tab widths don't shift as the
                  // count changes.
                  <span
                    aria-hidden="true"
                    className="absolute -right-4 -top-2 min-w-4 rounded-full bg-accent px-1 text-center font-mono text-[9px] leading-4 text-paper"
                  >
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </span>
              {active && <span className="absolute inset-x-6 top-0 h-px bg-accent" />}
            </Link>
          );
        })}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
