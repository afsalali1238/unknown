// Build-stamped version (see `define` in vite.config.ts). Falls back to
// "dev" wherever the Vite define isn't applied (e.g. vitest).
declare const __APP_VERSION__: string | undefined;

export const APP_VERSION: string = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev";
