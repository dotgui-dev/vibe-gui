<script>
  import { push } from 'svelte-spa-router';

  // Bottom bar from the original player shells (Back / Restart / Full Screen).
  export let backTo = '/games';
  export let fullscreenTo = '';
  export let showFullscreen = true;
  export let frameRef = null;

  function restart() {
    // Same effect as the original window.location.reload(), scoped to the game.
    if (frameRef) {
      const src = frameRef.src;
      frameRef.src = src;
    } else {
      window.location.reload();
    }
  }

  async function fullscreen() {
    // Original navigated to the raw embed URL; prefer the Fullscreen API
    // and only navigate as a fallback (e.g. cross-origin iframes).
    try {
      if (frameRef && frameRef.requestFullscreen) {
        await frameRef.requestFullscreen();
        return;
      }
      if (frameRef && frameRef.webkitRequestFullscreen) {
        await frameRef.webkitRequestFullscreen();
        return;
      }
    } catch {
      // fall through to navigation fallback
    }
    if (fullscreenTo) window.location.href = fullscreenTo;
  }
</script>

<div class="taskbar">
  <button on:click={() => push(backTo)}>Back</button>
  <button on:click={restart}>Restart</button>
  {#if showFullscreen}
    <button on:click={fullscreen}>Full Screen</button>
  {/if}
</div>
