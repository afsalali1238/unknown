// Standard TanStack Start + Vite config (no Lovable wrapper).
// Deploys to Vercel via preset.
/// <reference types="vitest" />
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    // Vite 6+ rejects requests whose Host header isn't localhost. Set
    // VITE_ALLOWED_HOSTS to a comma-separated list (or "true") when the dev
    // server is reached through a tunnel/preview proxy. Dev-only; production
    // builds ignore `server`.
    allowedHosts:
      process.env.VITE_ALLOWED_HOSTS === "true"
        ? true
        : process.env.VITE_ALLOWED_HOSTS?.split(",").filter(Boolean),
  },
  resolve: {
    dedupe: ["react", "react-dom"],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tsconfigPaths: true,
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
