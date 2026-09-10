import { writable } from 'svelte/store';

const KEY = 'tabCloaker';

function readStored() {
  try {
    return localStorage.getItem(KEY) || 'default';
  } catch {
    return 'default';
  }
}

// Same localStorage key as the original, so a cloak choice made on the
// old site carries over automatically.
export const cloak = writable(typeof localStorage !== 'undefined' ? readStored() : 'default');

cloak.subscribe((value) => {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // storage unavailable (private mode etc.) — cloak just won't persist
  }
});

const CLOAKS = {
  google: { title: 'Google', icon: 'https://www.google.com/favicon.ico' },
  vocab: { title: 'My Learning | Vocabulary.com', icon: 'https://www.vocabulary.com/favicon.ico' }
};

/** Apply the cloak, falling back to the page's own title + default icon. */
export function applyCloak(defaultTitle) {
  if (typeof document === 'undefined') return;
  let value = 'default';
  const unsub = cloak.subscribe((v) => (value = v));
  unsub();
  let favicon = document.querySelector("link[rel~='icon']");
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  const base = import.meta.env.BASE_URL || './';
  if (value === 'google' || value === 'vocab') {
    document.title = CLOAKS[value].title;
    favicon.href = CLOAKS[value].icon;
  } else {
    if (defaultTitle) document.title = defaultTitle;
    favicon.href = base + 'favicon.ico';
  }
}
