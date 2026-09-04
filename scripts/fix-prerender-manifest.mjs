/**
 * Repairs a corrupted `.next/dev/prerender-manifest.json` before `next dev`.
 *
 * Next 16.3.4's dev server keeps that manifest up to date with a plain
 * read-modify-write for every dynamic app route it renders (see
 * `readFile` -> `JSON.parse` -> `writeFile` in
 * node_modules/next/dist/server/dev/next-dev-server.js). There is no lock and
 * the write is not atomic, so two requests for two *different* dynamic routes
 * arriving together can interleave: one reads the file mid-write and dies with
 * "Unexpected end of JSON input", or a shorter write lands on a longer one and
 * leaves trailing bytes ("Unexpected non-whitespace character after JSON").
 *
 * Either way the manifest is then unparseable, and because every dynamic route
 * re-reads it, the whole site answers 500 until the file is fixed — which reads
 * exactly like the app being broken.
 *
 * The race only fires while the manifest is still changing, i.e. the first time
 * each route is rendered after `.next` is cleared. Once every route has been
 * seen the content stops changing, Next skips the write, and it cannot recur.
 *
 * So this only has to get the dev server back to a parseable file. It trims the
 * trailing garbage where it can (keeping the real preview keys) and deletes the
 * file otherwise; Next rebuilds it either way.
 */
import { readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const devDir = join(process.cwd(), '.next', 'dev');
const manifest = join(devDir, 'prerender-manifest.json');

// Sweep temp files from scripts/atomic-prerender-manifest.cjs that were orphaned
// by a dev server killed between writing one and renaming it into place.
if (existsSync(devDir)) {
  for (const entry of readdirSync(devDir)) {
    if (entry.startsWith('prerender-manifest.json.') && entry.endsWith('.tmp')) {
      rmSync(join(devDir, entry), { force: true });
    }
  }
}

if (existsSync(manifest)) {
  const raw = readFileSync(manifest, 'utf8');

  let valid = true;
  try {
    JSON.parse(raw);
  } catch {
    valid = false;
  }

  if (!valid) {
    // Longest parseable prefix: interleaved writes leave a complete document
    // followed by the tail of the longer one, so this normally recovers it whole.
    let end = -1;
    for (let i = raw.length; i > 0; i -= 1) {
      try {
        JSON.parse(raw.slice(0, i));
        end = i;
        break;
      } catch {
        /* keep shrinking */
      }
    }

    if (end > 0) {
      writeFileSync(manifest, raw.slice(0, end));
      console.log(
        `[fix-prerender-manifest] repaired ${manifest} (dropped ${raw.length - end} trailing bytes)`,
      );
    } else {
      rmSync(manifest);
      console.log(`[fix-prerender-manifest] removed unrecoverable ${manifest}; Next will rebuild it`);
    }
  }
}
