import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired: this dashboard duplicated Feed (Continue/Due today) and Explore
// (the full lattice list, now the "Every idea" view at /explore?view=lattice).
// Kept as a route only so old links/bookmarks still land somewhere.
export const Route = createFileRoute("/map")({
  loader: () => {
    throw redirect({ to: "/explore", search: { view: "lattice" } });
  },
});
