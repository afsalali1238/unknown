import * as fs from "fs";

async function fetchNodes() {
  const url = "https://epistemoph.vercel.app/assets/index-Di-bjCj_.js";
  const jsRes = await fetch(url);
  const js = await jsRes.text();
  fs.writeFileSync("epistemoph.js", js);
  console.log("Saved epistemoph.js. Length:", js.length);
}

fetchNodes().catch(console.error);
