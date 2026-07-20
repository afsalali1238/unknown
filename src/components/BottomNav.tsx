import { Link, useLocation } from "@tanstack/react-router";
import { MAIN_TABS } from "@/lib/mainRoutes";

export function BottomNav() {
  const { pathname } = useLocation();
  const tabs = MAIN_TABS;

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
              {active && <span className="absolute inset-x-6 top-0 h-px bg-accent" />}
            </Link>
          );
        })}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
