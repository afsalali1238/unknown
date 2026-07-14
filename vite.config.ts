// Standard TanStack Start + Vite config (no Lovable wrapper).
// Deploys to Vercel via nitro's "vercel" preset.
//
// NOTE: this was migrated off @lovable.dev/vite-tanstack-config without a working
// npm install in the migration environment, so it hasn't been verified with a real
// `npm run build`. Run that locally before deploying — if it errors, see
// docs/VERCEL-MIGRATION-PROMPT.md for exactly what to hand a coding agent to fix it.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    tanstackStart(),
    viteReact(),
  ],
});