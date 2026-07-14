"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Standard TanStack Start + Vite config (no Lovable wrapper).
// Deploys to Vercel via nitro's "vercel" preset.
//
// NOTE: this was migrated off @lovable.dev/vite-tanstack-config without a working
// npm install in the migration environment, so it hasn't been verified with a real
// `npm run build`. Run that locally before deploying — if it errors, see
// docs/VERCEL-MIGRATION-PROMPT.md for exactly what to hand a coding agent to fix it.
var vite_1 = require("vite");
var vite_2 = require("@tanstack/react-start/plugin/vite");
var vite_3 = require("@tanstack/router-plugin/vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var vite_4 = require("@tailwindcss/vite");
var vite_tsconfig_paths_1 = require("vite-tsconfig-paths");
exports.default = (0, vite_1.defineConfig)({
    resolve: {
        dedupe: ["react", "react-dom"],
    },
    plugins: [
        (0, vite_tsconfig_paths_1.default)({ projects: ["./tsconfig.json"] }),
        (0, vite_4.default)(),
        (0, vite_3.tanstackRouter)({ target: "react", autoCodeSplitting: true }),
        (0, vite_2.tanstackStart)({
            server: {
                entry: "server",
                target: "vercel",
            },
        }),
        (0, plugin_react_1.default)(),
    ],
});
