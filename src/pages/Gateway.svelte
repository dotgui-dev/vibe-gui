<script>
  import { push } from 'svelte-spa-router';
  import Cloak from '../components/Cloak.svelte';
</script>

<Cloak title="Starting Menu" />

<div id="main">
  <main>
    <h1>Welcome to VibeGUI!</h1>
    <div id="games">
      <p>Click here to continue: (If you are in about:blank, click proceed.)</p>
      <button type="button" class="nav-btn button" on:click={() => push('/home')}>Proceed</button>
      <br />
      <h2>If you can't access VibeGUI normally:</h2>
      <button type="button" class="nav-btn button" on:click={() => push('/cloak/about-blank')}>
        via About:Blank (very reliable)
      </button>
      <button type="button" class="nav-btn button" on:click={() => push('/cloak/blob')}>
        via Blob: page (somewhat reliable)
      </button>
      <button type="button" class="nav-btn button" on:click={() => push('/cloak/data-url')}>
        via DataURL (unreliable)
      </button>
    </div>
    <br />
    <p>
      You can also <a href="https://github.com/DotLYHiyou/DotGUI?tab=readme-ov-file#for-hosts">
        self-host your own links!
      </a>
    </p>
  </main>
</div>
