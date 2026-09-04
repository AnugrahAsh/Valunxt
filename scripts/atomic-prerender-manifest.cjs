/**
 * Makes the dev server's writes to `prerender-manifest.json` atomic.
 *
 * Next 16.3.4 keeps that manifest current by read-modify-writing it on every
 * dynamic app route it renders (next/dist/server/dev/next-dev-server.js):
 *
 *     const raw = await fs.promises.readFile(manifest, 'utf8');
 *     const existing = JSON.parse(raw);          // <- throws on a partial read
 *     existing.dynamicRoutes[pathname] = {...};
 *     await fs.promises.writeFile(manifest, JSON.stringify(existing));
 *
 * There is no lock and `writeFile` truncates in place, so two requests for two
 * different dynamic routes racing here break the file two ways: a reader can
 * catch it mid-write ("Unexpected end of JSON input") or a shorter write can
 * land on a longer one and leave its tail behind ("Unexpected non-whitespace
 * character after JSON"). Once the file is unparseable every dynamic route
 * answers 500, because they all re-read it — the whole site looks dead.
 *
 * It fires while the manifest is still growing, which is every cold start:
 * opening a few pages at once right after `next dev` is enough.
 *
 * Writing to a sibling temp file and renaming over the target closes both
 * windows. Rename is atomic, so a reader sees either the whole previous file or
 * the whole new one, never a torn one. Concurrent writers can still lose an
 * entry to each other, which costs nothing: Next re-adds it on the next render
 * of that route, and the file is always valid JSON in the meantime.
 *
 * Loaded through NODE_OPTIONS by scripts/dev.mjs so it reaches the server child
 * process that actually renders. Nothing in node_modules is modified; drop the
 * `dev` script back to `next dev` to remove it entirely.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const TARGET = 'prerender-manifest.json';
const RENAME_ATTEMPTS = 5;

let counter = 0;

const isTarget = (file) => typeof file === 'string' && path.basename(file) === TARGET;
const tmpFor = (file) => `${file}.${process.pid}.${counter++}.tmp`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Windows can refuse a rename while another process still holds the target open
 * (a concurrent reader, an indexer, a virus scanner). Those are transient, so
 * retry briefly before giving up.
 */
async function renameWithRetry(from, to) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      await fs.promises.rename(from, to);
      return;
    } catch (err) {
      const transient = err && (err.code === 'EPERM' || err.code === 'EACCES' || err.code === 'EBUSY');
      if (!transient || attempt >= RENAME_ATTEMPTS) throw err;
      await sleep(attempt * 10);
    }
  }
}

const realWriteFile = fs.promises.writeFile;

fs.promises.writeFile = function writeFile(file, data, options) {
  if (!isTarget(file)) return realWriteFile.call(this, file, data, options);

  const tmp = tmpFor(file);
  return realWriteFile
    .call(this, tmp, data, options)
    .then(() => renameWithRetry(tmp, file))
    .catch(async (err) => {
      await fs.promises.rm(tmp, { force: true }).catch(() => {});
      // Never make things worse than stock Next: fall back to the plain write.
      return realWriteFile.call(this, file, data, options);
    });
};

// `next dev` writes the initial manifest synchronously; keep that atomic too.
const realWriteFileSync = fs.writeFileSync;

fs.writeFileSync = function writeFileSync(file, data, options) {
  if (!isTarget(file)) return realWriteFileSync.call(this, file, data, options);

  const tmp = tmpFor(file);
  try {
    realWriteFileSync.call(this, tmp, data, options);
    fs.renameSync(tmp, file);
  } catch (err) {
    try {
      fs.rmSync(tmp, { force: true });
    } catch {
      /* nothing to clean up */
    }
    return realWriteFileSync.call(this, file, data, options);
  }
};
