import * as fs from "fs";
import * as path from "path";

const dir = path.resolve(process.cwd(), "dist/client/assets");
if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir).map((f) => `/assets/${f}`);

  const swPath = path.resolve(process.cwd(), "dist/client/sw.js");
  if (fs.existsSync(swPath)) {
    let sw = fs.readFileSync(swPath, "utf-8");

    // Replace the default static cache list with our explicit manifest
    const replaceTarget = '["/", "/manifest.webmanifest"]';
    const newManifest = JSON.stringify(["/", "/manifest.webmanifest", ...files]);

    sw = sw.replace(replaceTarget, newManifest);
    fs.writeFileSync(swPath, sw);
    console.log(`Injected ${files.length} assets into sw.js precache manifest`);
  } else {
    console.error("sw.js not found in dist/client");
  }
} else {
  console.error("dist/client/assets not found");
}
