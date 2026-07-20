import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

const dir = path.resolve(process.cwd(), "dist/client/assets");
const sourcesDir = path.resolve(process.cwd(), "dist/client/content/sources");

if (fs.existsSync(dir)) {
  const assetFiles = fs.readdirSync(dir).map((f) => `/assets/${f}`);

  // Precache every archived source markdown file too, so the /read/$id
  // archive reader works offline immediately after install instead of only
  // caching an article the first time it's opened while online.
  const sourceFiles = fs.existsSync(sourcesDir)
    ? fs
        .readdirSync(sourcesDir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => `/content/sources/${f}`)
    : [];

  const swPath = path.resolve(process.cwd(), "dist/client/sw.js");
  if (fs.existsSync(swPath)) {
    let sw = fs.readFileSync(swPath, "utf-8");

    // Replace the placeholder precache list with our explicit manifest
    const replaceTarget = '["/", "/manifest.webmanifest"]';
    const manifestList = ["/", "/manifest.webmanifest", ...assetFiles, ...sourceFiles];
    const newManifest = JSON.stringify(manifestList);

    // Content-addressed cache version: hash the exact set of precached
    // files instead of relying on a hand-bumped "unknown-vN" string in
    // sw.js. A deploy that doesn't change any cached file keeps the same
    // version (no needless cache churn); any deploy that does gets a new
    // version automatically, so the old caches are guaranteed to be dropped
    // in the activate handler - nobody has to remember to bump anything.
    const hash = crypto.createHash("sha256").update(manifestList.join(",")).digest("hex").slice(0, 10);
    sw = sw.replace(/const VERSION = "[^"]+";/, `const VERSION = "unknown-${hash}";`);

    sw = sw.replace(replaceTarget, newManifest);
    fs.writeFileSync(swPath, sw);
    console.log(
      `Injected ${assetFiles.length} assets and ${sourceFiles.length} archived source files into sw.js precache manifest (version unknown-${hash})`,
    );
  } else {
    console.error("sw.js not found in dist/client");
  }
} else {
  console.error("dist/client/assets not found");
}
