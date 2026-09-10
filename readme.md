# VibeGUI

VibeGUI is a Svelte rewrite of DotGUI (the static game site in the sibling `DotGUI/` directory, which was left completely untouched — verified via `git status`). It preserves the site's functioning, routes, and design while replacing ~110 copy-pasted static HTML pages with one small single-page app.

## What it is

- **Stack:** Svelte 4 + Vite 5 + `svelte-spa-router` (hash routing), no backend, no SSR. `npm install` / `npm run build` produces a static `dist/` folder (verified: clean build, zero warnings, ~66 KB JS gzip ~20 KB).
- **Catalog data instead of duplicated HTML:** all 104 game pages and 6 tool pages were parsed into `src/lib/games.js` / `src/lib/tools.js` (slug, filter key, tile label, image, embed URL, local-vs-external flag, catalog visibility). One `GamePlayer` and one `ToolPlayer` route render all 110 shells from that data, including the exact per-page embed URLs (local `game-embeds/*.html` aliases like `badtime`/`bind`/`cookie` included) and the 12 external fallback hosts.
- **Game files served verbatim:** `public/` contains byte-for-byte copies of the original `favicon.ico`, `media/` (81 files), `game-embeds/` (93 files incl. the GBA-port subfolder), `tool-embeds/` (`pico8.html`, `ruffle.html`), and the inlined 2 MB `tool-pages/sandstone.html`. No embed was rewritten, so every game behaves exactly as before.
- **Routes:** `/` gateway (old `index.html`), `/home`, `/games`, `/tools`, `/settings`, `/disclaimer`, `/play/:slug` (old `pages/game-pages/*.html`), `/tools/:slug` (old `pages/tool-pages/*.html`), `/cloak/about-blank`, `/cloak/blob`, `/cloak/data-url` (old `launch`/`blob`/`dataurl.html`). Every legacy path (`/start.html`, `/select.html`, `/settings.html`, `/tools.html`, `/disclaimer.html`, `/launch.html`, `/blob.html`, `/dataurl.html`, `/start`, `/select`) is aliased to the same component, so old bookmarks keep working.
- **Features ported 1:1:** tab cloaker (same `localStorage` key `tabCloaker`, so settings carry over; Google / Vocabulary.com spoofing), game live-filter with the same no-results message, game request form link, Discord link, 6 homepage quotes (one quote mentioning search was dropped with the search removal), footer credits, taskbar Back/Restart/Full Screen on players, blob launcher with the same 5 favicon presets and `rt_favicon_v1`/`rt_title_v1` keys, about:blank launcher, and the full `styles.css` design (nested rules flattened into valid CSS with identical cascade order).
- **Deployable anywhere as static files:** relative asset base (`./`) plus hash routing means deep links work with zero server rewrites. Included configs: `vercel.json` (SPA rewrites), `netlify.toml` + `public/_redirects` (`/* -> /index.html 200`, also read by Cloudflare Pages), `public/.nojekyll`, and `.github/workflows/deploy.yml` (GitHub Pages: `npm ci` + `npm run build` + `dist/` artifact). Tested by serving `dist/` and confirming 200s for the app, an embed, and an image.

## What is different / new (vs. the original)

1. **Fixed dead link:** the "Geometry Dash Demake" tile pointed to non-existent `geodashdemake.html` (404); it now opens the real page/embed.
2. **Fixed broken DataURL page:** it referenced an uncommitted `pages/dataurl.txt` and had no working button; it now builds and opens a working `data:` launcher tab.
3. **Fixed 404 title bug:** the old 404 page's cloak script set the title to "Disclaimer"; it now says 404.
4. **Fixed Crossy Roads tile:** its `alt` text wrongly said "Geometry Dash".
5. **Fixed Baldi's Basics filter key:** truncated to "Baldi" by a quote in the attribute; now the full title.
6. **Removed all search references:** the nav magnifier button, the `/search` + `/search.html` routes, the homepage note, and one homepage quote mentioning search are all gone (upstream `/search.html` never existed — it only ever produced a 404). The nav now has 5 buttons.
7. **Surfaced 2 hidden tools:** Ruffle Emulator and Soundboard existed as pages but had no catalog tiles; they now have tiles alongside the original 4.
8. **36 unlisted games stay playable** via direct `/play/<slug>` URLs (same as before, where their HTML files existed but had no tiles).
9. **Fullscreen upgraded:** the taskbar now tries the Fullscreen API first and only navigates to the raw embed as a fallback (old behavior navigated away immediately); tool shells still omit the button, as before.
10. **Removed Google Analytics (`G-Q919W0VJ1S`) and Bidvertiser ad widgets** (they were on nearly every page); there is no tracking or third-party script left except the games' own external hosts and the Google Fonts import.
11. **Blob launcher targets this deployment** instead of the hardcoded `https://dot-gui.vercel.app`, and launches in one click (no download-then-open round trip).
12. **Homepage trimmed:** the "Search temporarily unavailable" line was removed along with everything else search-related.
