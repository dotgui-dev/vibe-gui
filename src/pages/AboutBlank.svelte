<script>
  import Nav from '../components/Nav.svelte';
  import Cloak from '../components/Cloak.svelte';

  // Port of launch.html: opens an about:blank tab with this site embedded
  // full-screen. Points at this deployment's own root instead of index.html.
  function launch() {
    const win = window.open('about:blank', '_blank');
    if (!win) return;
    const url = window.location.href.split('#')[0];
    const iframe = win.document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.src = url;
    win.document.body.appendChild(iframe);
  }
</script>

<Cloak title="About:Blank Method" />
<Nav />

<div id="games">
  <main>
    <h1>Now Redirecting...</h1>
    <p>If this doesn't load, try allowing pop-ups. Don't worry, we won't do anything to you, we just need it to launch the tab.</p>
    <button class="button" on:click={launch}>Launch about:blank</button>
  </main>
</div>
