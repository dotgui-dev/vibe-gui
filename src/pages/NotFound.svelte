<script>
  import { push } from 'svelte-spa-router';
  import Nav from '../components/Nav.svelte';
  import Cloak from '../components/Cloak.svelte';

  const base = import.meta.env.BASE_URL || './';
</script>

<!-- Port of 404.html. The original tab-cloak script set the title to
     'Disclaimer' here by mistake — fixed to a proper 404 title. -->
<Cloak title="404" />
<Nav />

<div id="games">
  <main>
    <img src={base + 'media/error.webp'} width="200" height="200" alt="Error" />
    <h1>OH NOES!</h1>
    <h3>You've entered a page that is broken or non-existent!</h3>
    <h3>
      If you got here from a game, tool, or anything that is supposed to work, press
      <a href="https://github.com/DotLYHiyou/DotGUI/issues">here</a> to report the problem on the Github repository.
    </h3>
    <button type="button" on:click={() => push('/home')}>Return to Home</button>
  </main>
</div>
