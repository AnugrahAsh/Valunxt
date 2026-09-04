/**
 * Starts `next dev` with the atomic prerender-manifest shim preloaded.
 *
 * The shim has to reach the process that actually renders pages, which is the
 * server child Next forks (next/dist/server/lib/start-server.js) — not this one.
 * `--require` applies only to the process it is passed to, so the preload goes
 * through NODE_OPTIONS, which children inherit.
 *
 * See scripts/atomic-prerender-manifest.cjs for what it fixes and why. To drop
 * the whole thing, set the `dev` script back to `next dev`.
 */
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const preload = path.join(here, 'atomic-prerender-manifest.cjs');
const nextBin = require.resolve('next/dist/bin/next');

// NODE_OPTIONS is space-separated, so the path is quoted in case it contains
// spaces — and given with forward slashes, because Node unescapes backslashes
// inside those quotes and a Windows path would arrive with its separators eaten
// ("D:ApplicationValunxt-Websitescripts..."). Node accepts / on Windows.
const nodeOptions = [process.env.NODE_OPTIONS, `--require "${preload.replaceAll(path.sep, '/')}"`]
  .filter(Boolean)
  .join(' ');

const child = spawn(process.execPath, [nextBin, 'dev', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, NODE_OPTIONS: nodeOptions },
});

// Hand Ctrl-C and friends straight through, so stopping the dev server behaves
// exactly as it did when npm ran `next dev` itself.
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
