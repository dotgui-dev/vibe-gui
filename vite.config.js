import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  // Relative asset URLs so the built site works from any base path
  // (project subpaths on GitHub Pages, custom domains, preview URLs).
  base: './'
});
