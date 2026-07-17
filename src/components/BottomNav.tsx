import { Link, useLocation } from "@tanstack/react-router";
import { useStore, dueCount } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";

export function BottomNav() {
  const { pathname } = useLocation();
  const review = useStore((s) => s.review);
  const hydrated = useHydrated();
  const due = hydrated ? dueCount(review) : 0;

  const tabs = [
    {
      to: "/",
      label: "Feed",
      match: (p: string) => p === "/" || p.startsWith("/node"),
    },
    {
      to: "/skim",
      label: "Skim",
      match: (p: string) => p.startsWith("/skim") || p.startsWith("/map"),
    },
    { to: "/review", label: "Review", match: (p: string) => p.startsWith("/review"), badge: due },
    { to: "/you", label: "You", match: (p: string) => p.startsWith("/you") },
  ] as const;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl">
        {tabs.map((t) => {
          const active = t.match(pathname);
          return (
            <Link
              key={t.to}
              to={t.to}
              aria-label={t.label}
              aria-current={active ? "page" : undefined}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 py-3 min-h-14"
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                  active ? "text-accent" : "text-ink-soft"
                }`}
              >
                {t.label}
              </span>
              {"badge" in t && t.badge && t.badge > 0 ? (
                <span className="absolute top-2 right-1/2 translate-x-6 rounded-full bg-accent px-1.5 py-0.5 font-mono text-[10px] leading-none text-paper">
                  {t.badge}
                </span>
              ) : null}
              {active && <span className="absolute inset-x-6 top-0 h-px bg-accent" />}
            </Link>
          );
        })}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
