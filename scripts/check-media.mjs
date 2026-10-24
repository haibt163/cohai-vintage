// Fails when a media("...") reference in lib/ points at a file that is missing from
// public/assets/original/2025/03/, or when public/ contains files that look like
// WordPress/WooCommerce artefacts (logs, plugin caches, dumps).
// Warns (does not fail) about files in that folder that nothing references, e.g. a photo
// added with scripts/manage-photos.ps1 that has not been wired into lib/ yet.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const mediaDir = join(root, "public/assets/original/2025/03");
let failed = false;
const referenced = new Set();

for (const file of ["lib/content.ts", "lib/archive-media.ts"]) {
  const text = readFileSync(join(root, file), "utf8");
  for (const [, name] of text.matchAll(/media\("([^"]+)"\)/g)) {
    referenced.add(name);
    if (!existsSync(join(mediaDir, name))) {
      console.error(`MISSING media file referenced in ${file}: ${name}`);
      failed = true;
    }
  }
}

for (const name of readdirSync(mediaDir)) {
  if (!referenced.has(name)) {
    console.warn(`WARNING: media file not referenced by lib/content.ts or lib/archive-media.ts: ${name}`);
  }
}

const banned = /\.(log|sql|bak|env)$|^\.htaccess$|^index\.php$/i;
const bannedDirs = new Set(["wc-logs", "astra-sites", "ast-block-templates-json", "wpforms", "ai-builder", "wc-imports", "woocommerce_uploads"]);
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (bannedDirs.has(entry)) { console.error(`Forbidden directory under public/: ${full}`); failed = true; }
      else walk(full);
    } else if (banned.test(entry)) {
      console.error(`Forbidden file under public/: ${full}`);
      failed = true;
    }
  }
}
walk(join(root, "public"));

if (failed) process.exit(1);
console.log("check-media: OK");
