// Standard TanStack Start + Vite config (no Lovable wrapper).
// Deploys to Vercel via preset.
/// <reference types="vitest" />
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  preview: {
    allowedHosts: true,
  },
  resolve: {
    dedupe: ["react", "react-dom"],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tsconfigPaths: true,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes("src/data/nodes/cluster-")) {
            const m = id.match(/cluster-([^.]+)\.ts/);
            if (m) return `nodes-${m[1]}`;
          }
          if (id.includes("src/data/nodes.ts")) return "nodes";
          return undefined;
        },
      },
    },
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: {
        preset: "vercel",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any),
    viteReact(),
  ],
});
