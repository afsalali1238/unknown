import { Link, useLocation } from "@tanstack/react-router";
import { MAIN_TABS } from "@/lib/mainRoutes";
import { useStore, dueCount } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";

export function BottomNav() {
  const { pathname } = useLocation();
  const tabs = MAIN_TABS;
  const hydrated = useHydrated();
  const review = useStore((s) => s.review);
  const due = hydrated ? dueCount(review) : 0;
  // Hide chrome on focused reading / onboarding flows — after hooks to respect rules of hooks
  if (pathname.startsWith("/onboarding") || pathname.startsWith("/read/")) return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-line bg-paper/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-2xl">
        {tabs.map((t) => {
          const active = t.match(pathname);
          const isReview = t.to === "/review";
          return (
            <Link
              key={t.to}
              to={t.to}
              aria-label={isReview && due > 0 ? `Review, ${due} due` : t.label}
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
              {isReview && due > 0 && (
                <span className="absolute top-1.5 right-3 min-w-5 h-5 px-1 grid place-items-center rounded-full bg-accent text-paper font-mono text-[10px] leading-none">
                  {due > 99 ? "99+" : due}
                </span>
              )}
              {active && <span className="absolute inset-x-6 top-0 h-px bg-accent" />}
            </Link>
          );
        })}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
