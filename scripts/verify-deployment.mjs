// Read-only smoke check of a deployed Cô Hai Vintage origin.
// Usage: node scripts/verify-deployment.mjs https://cohaivintage.com [--preview]
// Exit code 1 if any check FAILS. Necessary but NOT sufficient: it cannot judge sharpness, layout or motion.
const origin = (process.argv[2] ?? "").replace(/\/$/, "");
const isPreview = process.argv.includes("--preview");
if (!/^https?:\/\//.test(origin)) {
  console.error("Usage: node scripts/verify-deployment.mjs <origin> [--preview]");
  process.exit(2);
}

const results = [];
const record = (ok, name, detail = "") => {
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
};
const get = (path, init = {}) => fetch(origin + path, { redirect: "manual", ...init });

async function main() {
  console.log(`Verifying ${origin}${isPreview ? " (preview mode)" : ""}\n`);

  // Home page (default locale) — headers, metadata, structured data, skip link
  const home = await get("/");
  const html = await home.text();
  record(home.status === 200, "GET / returns 200", `status ${home.status}`);
  const h = (n) => home.headers.get(n) ?? "";
  record(h("x-content-type-options") === "nosniff", "header X-Content-Type-Options: nosniff", h("x-content-type-options"));
  record(!!h("referrer-policy"), "header Referrer-Policy present", h("referrer-policy"));
  record(!!h("x-frame-options"), "header X-Frame-Options present", h("x-frame-options"));
  const robotsHeader = h("x-robots-tag");
  record(isPreview ? /noindex/i.test(robotsHeader) : !/noindex/i.test(robotsHeader),
    isPreview ? "preview sends X-Robots-Tag noindex" : "production does NOT send noindex", robotsHeader || "(none)");
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/)?.[1] ?? html.match(/<link[^>]+href="([^"]+)"[^>]*rel="canonical"/)?.[1];
  record(!!canonical && (isPreview || canonical.startsWith(origin)), "canonical host matches origin", canonical ?? "(missing)");
  const ogImage = html.match(/<meta[^>]+property="og:image"[^>]*content="([^"]+)"/)?.[1] ?? html.match(/<meta[^>]+content="([^"]+)"[^>]*property="og:image"/)?.[1];
  record(!!ogImage && (isPreview || ogImage.startsWith(origin)), "og:image present, host matches origin", ogImage ?? "(missing)");
  record(html.includes("application/ld+json"), "JSON-LD present on home");
  record(html.includes("skip-link"), "skip-to-content link present");
  record(/<html[^>]+lang="vi"/.test(html), "default locale renders <html lang=\"vi\">");

  // English via cookie
  const en = await (await get("/", { headers: { cookie: "cohai-locale=en" } })).text();
  record(/<html[^>]+lang="en"/.test(en), "cookie cohai-locale=en renders <html lang=\"en\">");

  // Static endpoints
  const sm = await get("/sitemap.xml");
  const smText = await sm.text();
  const locs = [...smText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  record(sm.status === 200 && locs.length >= 5, "sitemap.xml lists URLs", `${locs.length} URLs`);
  record(isPreview || locs.every((l) => l.startsWith(origin)), "every sitemap <loc> uses the production origin");
  const rb = await get("/robots.txt");
  const rbText = await rb.text();
  record(rb.status === 200 && /Sitemap:\s*\S+\/sitemap\.xml/i.test(rbText), "robots.txt points to sitemap", rbText.split("\n").find((l) => /sitemap/i.test(l)) ?? "");
  const og = await get("/opengraph-image");
  record(og.status === 200 && /image\/png/.test(og.headers.get("content-type") ?? ""), "/opengraph-image serves a PNG", `${og.status} ${og.headers.get("content-type")}`);
  const mf = await get("/manifest.webmanifest");
  record(mf.status === 200, "manifest.webmanifest returns 200", `status ${mf.status}`);

  // Redirects and 404
  const pf = await get("/portfolio");
  record(pf.status === 308 && (pf.headers.get("location") ?? "").endsWith("/journal"), "/portfolio -> 308 /journal", `${pf.status} ${pf.headers.get("location")}`);
  const nf = await get("/this-page-does-not-exist-xyz");
  record(nf.status === 404, "unknown route returns 404", `status ${nf.status}`);

  // Every sitemap page renders
  for (const loc of locs) {
    const path = new URL(loc).pathname;
    const r = await get(path);
    const body = await r.text();
    const isArticle = path.startsWith("/journal/");
    record(r.status === 200, `GET ${path}`, `status ${r.status}`);
    if (isArticle) record(body.includes('"@type":"Article"'), `Article JSON-LD on ${path}`);
  }

  // Image optimiser
  const imgPath = html.match(/\/_next\/image\?url=[^"'\s>]+/)?.[0]?.replace(/&amp;/g, "&");
  if (!imgPath) {
    record(false, "image optimiser URL found in home HTML", "(none found)");
  } else {
    const img = await get(imgPath, { headers: { accept: "image/avif,image/webp,image/*" } });
    const type = img.headers.get("content-type") ?? "";
    const bytes = (await img.arrayBuffer()).byteLength;
    record(img.status === 200 && /image\/(avif|webp)/.test(type), "optimiser serves AVIF/WebP", `${img.status} ${type} ${(bytes / 1024).toFixed(0)} KB`);
  }

  const failed = results.filter((r) => !r).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed${failed ? `, ${failed} FAILED` : ""}. (Human visual check still required.)`);
  process.exit(failed ? 1 : 0);
}

main().catch((error) => {
  console.error("verify-deployment error:", error.message);
  process.exit(1);
});
