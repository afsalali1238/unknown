# Unknown

A latticework of powerful ideas. Unknown is an interactive, audio-narrated, and cross-linked knowledge exploration platform designed to help users learn in layers and retain concepts using spaced repetition.

## Tech Stack

This project is built using a modern React stack:

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing & Server**: [TanStack Router](https://tanstack.com/router) & [TanStack Start](https://tanstack.com/start)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed, as it is used for dependency management and fast execution.

### Installation

Install the dependencies:

```bash
bun install
```

### Development

To start the local development server:

```bash
bun run dev
```

### Building for Production

To build the application for production:

```bash
bun run build
```

### Checks

```bash
bun run check   # validate content schema + lint + test + build (what CI runs)
```

## Structure

- `src/components/`: feature components (`LayerReveal`, `Quiz`, `RecallReveal`, `RelatedCard`, `AudioBar`, `BottomNav`, `SearchBar`, `LatticeIndex`); `src/components/ui/` is the shadcn primitive layer.
- `src/routes/`: TanStack Router page definitions (Feed at `/`, `/skim`, `/explore`, `/node/$id`, `/review`, `/you`, `/onboarding`, `/read/$id`).
- `src/lib/`: Zustand store (IndexedDB-persisted), feed sequencing, seeded randomness.
- `content/`: the content source of truth — one JSON file per cluster (387 nodes, 38 clusters). `bun run build:content` derives `src/data/nodes.ts` (the bundled index) and `public/content/bodies/` (per-cluster bodies fetched on demand) from it. See `docs/CONTENT-LAYER.md`.
- `scripts/`: the content pipeline — `build-content.ts`, `validate-nodes.ts`, `archive-sources.ts`, `next-id.ts`, `audit-content.ts`, `topics-index.ts`. See `.claude/CLAUDE.md` and `docs/PRODUCT-BRIEF.md`.
