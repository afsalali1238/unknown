import * as fs from 'fs';

async function run() {
  const oldCode = fs.readFileSync('src/data/old_nodes.ts', 'utf8');
  const newCode = fs.readFileSync('src/data/nodes.ts', 'utf8');

  // We will parse the old code by evaluating it
  // Since it's TS, we can't eval it directly if it has types.
  // Instead, let's use a simple regex or string manipulation.
  
  // Or better, let's compile it with ts-node or just strip types.
  // The easiest way is to use ts-morph.
}
run();
