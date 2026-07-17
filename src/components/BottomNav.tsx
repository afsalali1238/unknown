import { Link, useLocation } from "@tanstack/react-router";

export function BottomNav() {
  const { pathname } = useLocation();

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
    {
      to: "/explore",
      label: "Explore",
      match: (p: string) => p.startsWith("/explore"),
    },
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
              {active && <span className="absolute inset-x-6 top-0 h-px bg-accent" />}
            </Link>
          );
        })}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
