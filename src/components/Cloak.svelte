<script>
  import { onDestroy, onMount } from 'svelte';
  import { cloak, applyCloak } from '../lib/cloak.js';

  // Keeps document.title / favicon in sync with the tab-cloak setting,
  // exactly like the inline script on every original page.
  export let title = '';

  let unsub = () => {};
  onMount(() => {
    applyCloak(title);
    unsub = cloak.subscribe(() => applyCloak(title));
  });
  onDestroy(() => unsub());
</script>
