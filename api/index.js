// Using standard Node.js runtime which supports Web Request/Response on Vercel
import server from "../dist/server/server.js";

export default async function fetch(request, event) {
  return server.fetch(request, process.env, event);
}
