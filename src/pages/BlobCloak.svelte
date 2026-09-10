<script>
  import { onMount } from 'svelte';
  import Nav from '../components/Nav.svelte';
  import Cloak from '../components/Cloak.svelte';

  // Port of pages/blob.html (reached via the old blob.html download page).
  // Same 5 presets, same localStorage keys (rt_favicon_v1 / rt_title_v1),
  // same warning — but the iframe targets this deployment's own root
  // instead of the hardcoded dot-gui.vercel.app URL.
  const options = [
    { src: 'http://4texas4.github.io/ratgames/m7bc3v.png', title: 'New Tab' },
    { src: 'https://5-t.vercel.app/assets/img/docs.webp', title: 'Google Docs' },
    { src: 'https://www.gstatic.com/classroom/logo_square_rounded.svg', title: 'Classes' },
    { src: 'https://www.google.com/favicon.ico', title: 'Google' },
    { src: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png', title: 'Home - Google Drive' }
  ];

  const KEY_FAV = 'rt_favicon_v1';
  const KEY_TITLE = 'rt_title_v1';

  let selectedIndex = 0;
  let overlayOpen = false;
  let settingsBtn;

  function selectedLabel() {
    return 'Selected: ' + (options[selectedIndex]?.title || 'Untitled');
  }

  function loadSettings() {
    try {
      const savedFav = localStorage.getItem(KEY_FAV);
      if (savedFav) {
        const idx = options.findIndex((o) => o.src === savedFav);
        if (idx >= 0) selectedIndex = idx;
      }
    } catch {
      // ignore
    }
  }

  function saveSettings() {
    const opt = options[selectedIndex];
    try {
      localStorage.setItem(KEY_FAV, opt.src || '');
      localStorage.setItem(KEY_TITLE, opt.title || 'New Tab');
    } catch {
      // ignore
    }
    overlayOpen = false;
    settingsBtn?.focus();
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (s) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[s]);
  }

  function openBlobUrl() {
    let favicon = options[selectedIndex].src;
    let title = options[selectedIndex].title || 'New Tab';
    try {
      favicon = localStorage.getItem(KEY_FAV) || favicon;
      title = localStorage.getItem(KEY_TITLE) || title;
    } catch {
      // ignore
    }
    const linkTag = favicon ? `<link rel="icon" href="${favicon}">` : '';
    const target = window.location.href.split('#')[0];
    const content =
      '<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">\n' +
      `<title>${escapeHtml(title)}</title>\n${linkTag}\n` +
      '<style>html,body,iframe{margin:0;padding:0;border:0;height:100%;width:100%}' +
      'iframe{display:block;height:100vh;width:100vw}</style>\n</head>\n<body>\n' +
      `<iframe src="${target}" allowfullscreen></iframe>\n</body>\n</html>`;
    const blob = new Blob([content], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    const w = window.open(blobUrl, '_blank');
    setTimeout(() => URL.revokeObjectURL(blobUrl), 800);
    if (w) w.focus();
  }

  function onOverlayClick(e) {
    if (e.target?.dataset?.overlay) {
      overlayOpen = false;
      settingsBtn?.focus();
    }
  }

  function onOverlayKey(e) {
    if (e.key === 'Escape' && overlayOpen) {
      overlayOpen = false;
      settingsBtn?.focus();
    }
    if ((e.key === 'Enter' || e.key === ' ') && e.target?.dataset?.overlay) {
      overlayOpen = false;
      settingsBtn?.focus();
    }
  }

  onMount(() => {
    loadSettings();
  });
</script>

<svelte:window on:keydown={onOverlayKey} />

<Cloak title="Blob Method" />
<Nav />

<div id="games">
  <main>
    <h2>Notes:</h2>
    <p>
      Click Open below to launch this site in a blob tab. The tab created lasts until you close it, from there,
      it cannot be re-opened.
    </p>
  </main>
</div>

<div class="blob-stage" aria-live="polite">
  <button class="blob-settings-btn" bind:this={settingsBtn} aria-label="Open settings" on:click={() => (overlayOpen = true)}>
    ⚙️
  </button>
  <button class="blob-open-btn" on:click={openBlobUrl}>Open</button>
  <div class="blob-warning">*DO NOT bookmark the next page, it won’t exist after closing*</div>
</div>

{#if overlayOpen}
  <div
    class="blob-overlay show"
    data-overlay="1"
    role="button"
    tabindex="0"
    aria-label="Close settings"
    on:click={onOverlayClick}
    on:keydown={onOverlayKey}
    aria-hidden="false"
  >
    <div class="blob-settings-card" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
      <div class="blob-card-head">
        <div>
          <div id="settingsTitle" class="blob-card-title">Settings</div>
          <div class="blob-card-sub">Choose a favicon — title will be applied automatically.</div>
        </div>
        <button
          aria-label="Close settings"
          style="background:none;border:none;font-size:18px;cursor:pointer"
          on:click={() => { overlayOpen = false; settingsBtn?.focus(); }}
        >
          ✕
        </button>
      </div>
      <div class="blob-fav-grid" role="list">
        {#each options as opt, i}
          <button
            class="blob-fav-tile"
            class:selected={i === selectedIndex}
            type="button"
            aria-label={opt.title}
            title={opt.title}
            on:click={() => (selectedIndex = i)}
          >
            <img src={opt.src} alt={opt.title} />
          </button>
        {/each}
      </div>
      <div class="blob-selected-label">{selectedLabel()}</div>
      <div class="blob-modal-actions">
        <button class="blob-btn blob-cancel" on:click={() => { overlayOpen = false; settingsBtn?.focus(); }}>
          Cancel
        </button>
        <button class="blob-btn blob-save" on:click={saveSettings}>Save</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .blob-stage {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    padding: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    position: relative;
    color: #111827;
  }
  .blob-settings-btn {
    position: fixed;
    top: 18px;
    right: 18px;
    width: 44px;
    height: 44px;
    background: #ffffff;
    border-radius: 10px;
    border: none;
    box-shadow: 0 6px 18px rgba(2, 6, 23, 0.08);
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: transform 0.16s ease, box-shadow 0.16s;
    font-size: 18px;
    z-index: 999;
  }
  .blob-settings-btn:hover {
    transform: rotate(20deg) scale(1.03);
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.12);
  }
  .blob-open-btn {
    background: #ffffff;
    border-radius: 12px;
    padding: 22px 64px;
    font-weight: 700;
    font-size: 20px;
    color: #111827;
    border: none;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s;
  }
  .blob-open-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 36px rgba(15, 23, 42, 0.14);
  }
  .blob-open-btn:active {
    transform: translateY(0);
  }
  .blob-warning {
    font-size: 13px;
    color: #b91c1c;
    font-weight: 700;
    margin-top: 4px;
  }
  .blob-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(2, 6, 23, 0.4);
    z-index: 40;
    padding: 20px;
  }
  .blob-settings-card {
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.12);
  }
  .blob-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .blob-card-title {
    font-weight: 700;
    font-size: 18px;
    color: #0f1724;
  }
  .blob-card-sub {
    font-size: 13px;
    color: #6b7280;
  }
  .blob-fav-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 14px;
    justify-items: center;
  }
  .blob-fav-tile {
    width: 72px;
    height: 72px;
    background: rgba(15, 23, 42, 0.02);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.12s ease, transform 0.12s ease, box-shadow 0.12s;
    outline: none;
  }
  .blob-fav-tile img {
    display: block;
    max-width: 46px;
    max-height: 46px;
    width: auto;
    height: auto;
    object-fit: contain;
    pointer-events: none;
  }
  .blob-fav-tile:hover {
    transform: translateY(-4px);
  }
  .blob-fav-tile.selected {
    border-color: #007bff;
    box-shadow: 0 8px 28px rgba(2, 6, 23, 0.08);
    background: linear-gradient(180deg, rgba(0, 123, 255, 0.03), rgba(0, 123, 255, 0.01));
  }
  .blob-selected-label {
    margin-top: 12px;
    font-size: 13px;
    color: #6b7280;
    text-align: center;
    min-height: 18px;
  }
  .blob-modal-actions {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }
  .blob-btn {
    flex: 1;
    padding: 10px 12px;
    border-radius: 10px;
    border: none;
    font-weight: 700;
    cursor: pointer;
  }
  .blob-cancel {
    background: #f1f5f9;
    color: #0f1724;
  }
  .blob-save {
    background: #007bff;
    color: #fff;
  }
  @media (max-width: 420px) {
    .blob-fav-tile {
      width: 64px;
      height: 64px;
    }
    .blob-fav-tile img {
      max-width: 40px;
      max-height: 40px;
    }
    .blob-open-btn {
      padding: 18px 40px;
      font-size: 18px;
    }
  }
</style>
