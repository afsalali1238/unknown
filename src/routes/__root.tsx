import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { BottomNav } from "@/components/BottomNav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">404</p>
        <h1 className="mt-3 font-serif text-4xl text-ink">Not in the lattice</h1>
        <p className="mt-3 text-sm text-ink-soft">
          This idea isn't wired up. Head back to the map and follow another thread.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center border border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper"
        >
          Back to map
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-ink">Something didn't load</h1>
        <p className="mt-2 text-sm text-ink-soft">Try again, or head home.</p>
        <div className="mt-5 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-ink bg-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#FAF8F3" },
      { title: "Unknown — A latticework of powerful ideas" },
      {
        name: "description",
        content:
          "An audio-narrated, cross-linked map of the world's most powerful ideas. Learn in layers. Retain with spaced repetition.",
      },
      { property: "og:title", content: "Unknown — A latticework of powerful ideas" },
      {
        property: "og:description",
        content:
          "An audio-narrated, cross-linked map of the world's most powerful ideas. Learn in layers. Retain with spaced repetition.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-paper pb-32">
        <div className="mx-auto max-w-2xl">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </QueryClientProvider>
  );
}
