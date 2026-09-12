# Commonplace

A latticework of powerful ideas. Commonplace is an interactive, audio-narrated, and cross-linked knowledge exploration platform designed to help users learn in layers and retain concepts using spaced repetition.

## Tech Stack

This project is built using a modern React stack:

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing & Server**: [TanStack Router](https://tanstack.com/router) & [TanStack Start](https://tanstack.com/start)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **UI**: plain Tailwind on native elements + [lucide-react](https://lucide.dev/) icons (no component library)

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

## Structure

- `src/components/`: Feature components (LayerReveal, Quiz, RecallReveal, RelatedCard, AudioBar, BottomNav, SearchBar, …).
- `src/routes/`: Tanstack Router page definitions.
- `src/data/`: `nodes.ts` (aggregator + derived indexes) and `nodes/cluster-*.ts`, the static data layer storing all nodes and edges for the lattice.
- `scripts/`: Helper scripts for data generation and testing.
