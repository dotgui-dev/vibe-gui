<script>
  import Nav from '../components/Nav.svelte';
  import Cloak from '../components/Cloak.svelte';
  import Taskbar from '../components/Taskbar.svelte';
  import NotFound from './NotFound.svelte';
  import { findGame } from '../lib/games.js';

  export let params = {};
  const base = import.meta.env.BASE_URL || './';

  $: game = findGame(params.slug || '');
  // Local vendored embeds are served from this same site; anything else
  // is one of the original external fallback hosts, kept as-is.
  $: src = game ? (game.external ? game.embed : base + game.embed) : '';
  $: fullscreenUrl = src;
  let frame = null;
</script>

{#if game}
  <Cloak title={game.title} />
  <Nav />
  <div class="player-shell">
    <iframe
      id="gameEmbed"
      class="game-embed"
      title={game.title}
      {src}
      bind:this={frame}
      allowfullscreen
      allow="fullscreen; autoplay; gamepad; cross-origin-isolated"
    />
    <Taskbar backTo="/games" fullscreenTo={fullscreenUrl} frameRef={frame} />
  </div>
{:else}
  <NotFound />
{/if}
