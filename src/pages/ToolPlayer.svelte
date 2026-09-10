<script>
  import Nav from '../components/Nav.svelte';
  import Cloak from '../components/Cloak.svelte';
  import Taskbar from '../components/Taskbar.svelte';
  import NotFound from './NotFound.svelte';
  import { findTool } from '../lib/tools.js';

  export let params = {};
  const base = import.meta.env.BASE_URL || './';

  $: tool = findTool(params.slug || '');
  $: src = tool ? (tool.external ? tool.embed : base + tool.embed) : '';
  $: fullscreenUrl = src;
  // The original tool shells had no Full Screen button; keep that behavior.
  let frame = null;
</script>

{#if tool}
  <Cloak title={tool.title} />
  <Nav />
  <div class="player-shell">
    <iframe
      id="gameEmbed"
      class="game-embed"
      title={tool.title}
      {src}
      bind:this={frame}
      allowfullscreen
      allow="fullscreen; autoplay; clipboard-read; clipboard-write"
    />
    <Taskbar backTo="/tools" fullscreenTo={fullscreenUrl} showFullscreen={false} frameRef={frame} />
  </div>
{:else}
  <NotFound />
{/if}
