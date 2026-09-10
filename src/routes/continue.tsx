import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { NODE_BY_ID } from "@/data/nodes";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";
import { APP_NAME } from "@/lib/site";

export const Route = createFileRoute("/continue")({
  head: () => ({
    meta: [
      { title: `Continue — ${APP_NAME}` },
      { name: "description", content: "Pick up where you left off." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ContinueRoute,
});

// Launcher-shortcut + deep-link target: resolves to the last-read node, or
// the feed when there isn't one (or it no longer exists). Client-side on
// purpose — lastNodeId lives in IndexedDB, which SSR can't see.
function ContinueRoute() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const lastNodeId = useStore((s) => s.lastNodeId);

  useEffect(() => {
    if (!hydrated) return;
    if (lastNodeId && NODE_BY_ID[lastNodeId]) {
      navigate({ to: "/node/$id", params: { id: lastNodeId }, replace: true });
    } else {
      navigate({ to: "/", replace: true });
    }
  }, [hydrated, lastNodeId, navigate]);

  return <div className="px-5 pt-8" aria-hidden="true" />;
}
