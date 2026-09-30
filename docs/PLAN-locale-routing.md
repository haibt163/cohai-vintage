# Plan — path-based locales (audit finding A-02)

**Status:** PLAN ONLY — no application code changed. Type when implemented: implementation on its own branch (`feat/path-locales`).
Read-only design prepared 30 Sep 2026. Everything about Next 16 behaviour below is **UNVERIFIED** until built and previewed.

## Problem (VERIFIED from source)
- Locale is a cookie (`cohai-locale`, default `vi`) read by `getLocale()` via `cookies()` in the root layout, header, footer and every page.
- Consequences: every route is dynamic; search engines send no cookie, so **English is never crawlable**; no `hreflang`; canonicals do not
  distinguish languages; social previews are always Vietnamese.

## Proposed design
1. Routes under `app/[locale]/…` with `generateStaticParams` returning `vi` and `en`; unknown locales → `notFound()`.
2. Unprefixed URLs (`/`, `/about`, `/shop/...`) redirect to `/{locale}/…` (308) using: cookie `cohai-locale` → `Accept-Language` → default `vi`.
   Implemented in a request-time redirect layer (Next 16 renamed `middleware` to `proxy` — confirm the current file convention before coding).
3. `getLocale()` is replaced by the `params.locale` value; the root layout no longer calls `cookies()` so pages can be statically rendered.
4. `LanguageSwitcher` becomes plain links to the same path in the other locale and still writes the cookie to remember the choice.
5. Metadata per page: `alternates.canonical` = own locale URL; `alternates.languages` = `{ vi, en, "x-default": vi }`; `openGraph.locale` and
   `alternateLocale`; `<html lang>` from the param; JSON-LD `inLanguage`.
6. `sitemap.ts` emits both locale URLs per page with `alternates.languages`.
7. Legacy redirects: existing unprefixed URLs and `/portfolio*` chain to the correct `/{locale}/journal…` in **one hop**.
8. `scripts/verify-deployment.mjs` updated for the new URL shape (redirect targets, hreflang, `lang`).

## Owner decisions needed before coding
- URL shape: `/vi/…` + `/en/…` (recommended, symmetric) vs Vietnamese at the root and English under `/en/…`.
- Default locale for visitors with no signal (currently Vietnamese).
- Whether the English site should be indexed now (requires reviewing EN copy quality first).

## Acceptance criteria (each must be observed on a preview, then production)
- `/en/journal` and `/vi/journal` return 200 with correct `<html lang>`, title, description and canonical.
- Both carry reciprocal `hreflang` links plus `x-default`; the sitemap lists both.
- `/` and `/shop` redirect (308) to the locale URL; a request with `cohai-locale=en` lands on `/en/…`; no redirect loops.
- Old `/portfolio/<slug>` reaches `/{locale}/journal/<slug>` in one hop.
- `next build` output shows the pages as statically generated (not dynamic) — this is the performance payoff.
- Lint, typecheck, `check:media`, build all pass with output attached; visual check on desktop and iPhone in both languages.

## Risks
- Largest routing change so far; touches every page, layout, header/footer and the sitemap. Keep it to one reviewable branch with logical commits.
- SEO churn: URL changes need correct 308s and Search Console re-submission of the sitemap.
- `NEXT_PUBLIC_SITE_URL` must be correct in production before hreflang/canonicals are trusted.
