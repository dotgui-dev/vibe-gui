<script>
  import Nav from '../components/Nav.svelte';
  import Cloak from '../components/Cloak.svelte';
  import { cloak } from '../lib/cloak.js';
</script>

<Cloak title="Settings" />
<Nav />

<div id="games" class="center-col">
  <main>
    <h1>Settings:</h1>
    <div style="margin-top:2rem;">
      <select id="tabCloaker" style="font-size:1em;padding:0.5em;" bind:value={$cloak}>
        <option value="default">Default</option>
        <option value="google">Google</option>
        <option value="vocab">Vocabulary.com</option>
      </select>
    </div>
    <div style="height:1.5em;" />
  </main>
</div>
