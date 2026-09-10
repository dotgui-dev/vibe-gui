<script>
  import Nav from '../components/Nav.svelte';
  import Cloak from '../components/Cloak.svelte';
  import { quotes } from '../lib/quotes.js';

  const quote = quotes[Math.floor(Math.random() * quotes.length)];
</script>

<Cloak title="VibeGUI" />
<Nav />

<div id="main">
  <main>
    <h1>VibeGUI | Back to school patch</h1>
    <h2>I got my new laptop and I fixed all the links! I'll be releasing an update soon.</h2>
    <p id="random-text" style="font-size:1.2em; margin:20px 0;">{quote}</p>
    <p>
      Join our <a href="https://discord.com/invite/U8tT8AazXb">community server</a> to report problems and get more
      links. Make sure to star VibeGUI on GitHub if you fork it!
    </p>
  </main>
</div>

<footer>
  <p>Made by DotLYHiyou on Github.</p>
  <p>There is no one other than listed contributors on the github page that are affiliated with this project.</p>
  <p>If someone claims otherwise, close that tab and haul ass out of there.</p>
  <p>VibeGUI is a Svelte rewrite of DotGUI — same games, same idea.</p>
</footer>
