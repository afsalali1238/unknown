export const config = {
  runtime: 'edge',
};

import server from '../dist/server/server.js';

export default async function fetch(request, event) {
  return server.fetch(request, process.env, event);
}
