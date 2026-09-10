<script>
  import { push } from 'svelte-spa-router';
  import Nav from '../components/Nav.svelte';
  import Cloak from '../components/Cloak.svelte';
  import { listedGames } from '../lib/games.js';

  const base = import.meta.env.BASE_URL || './';
  let query = '';

  $: q = query.trim().toLowerCase();
  $: visible = q
    ? listedGames.filter((g) => (g.key + ' ' + g.label + ' ' + g.title).toLowerCase().includes(q))
    : listedGames;
</script>

<Cloak title="Games" />
<Nav />

<div id="games">
  <main>
    <h1>Games:</h1>
    <div class="search-bar-container">
      <input
        id="game-search"
        class="search-bar"
        type="text"
        placeholder="Look for a game you want..."
        autocomplete="off"
        bind:value={query}
      />
    </div>
    {#if visible.length === 0}
      <div id="no-results-message">No results found. Please use the game suggestion form below. 👇</div>
    {/if}
    <button
      class="button"
      id="request"
      on:click={() => window.open('https://forms.gle/d8hBcyNGbLXk7cEk9', '_blank')}
    >
      Game Request Form
    </button>
    <div id="game-buttons">
      {#each visible as game (game.slug)}
        <button class="button" on:click={() => push('/play/' + game.slug)} title={game.label}>
          {#if game.img}
            <img src={base + game.img} alt={game.label} style="width:130px;height:130px;" />
          {:else}
            {game.label}
          {/if}
        </button>
      {/each}
    </div>
  </main>
</div>
