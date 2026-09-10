<script>
  import { push } from 'svelte-spa-router';
  import Nav from '../components/Nav.svelte';
  import Cloak from '../components/Cloak.svelte';
  import { tools } from '../lib/tools.js';

  const base = import.meta.env.BASE_URL || './';
</script>

<Cloak title="Tools" />
<Nav />

<div id="games">
  <main>
    <h1>Tools</h1>
    {#each tools as tool (tool.slug)}
      <button class="button" on:click={() => push('/tools/' + tool.slug)} title={tool.title}>
        {#if tool.img}
          <img src={base + tool.img} alt={tool.title} style="width:130px;height:130px;" />
        {:else}
          {tool.title}
        {/if}
      </button>
    {/each}
  </main>
</div>
