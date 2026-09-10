<script>
  import Nav from '../components/Nav.svelte';
  import Cloak from '../components/Cloak.svelte';

  // The original dataurl.html was broken: it pointed at a pages/dataurl.txt
  // file that was never committed and its triggerDownload() had no button.
  // This port actually works — it builds a tiny launcher page that embeds
  // this deployment and opens it as a data: URL (which lasts forever and
  // can be re-opened, as the original notes describe).
  let opened = false;
  let failed = false;

  function openDataUrl() {
    failed = false;
    const target = window.location.href.split('#')[0];
    const launcher =
      '<!doctype html><html><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>VibeGUI</title>' +
      '<style>html,body,iframe{margin:0;padding:0;border:0;height:100%;width:100%}' +
      'iframe{display:block;height:100vh;width:100vw}</style></head><body>' +
      '<iframe src="' +
      target.replace(/&/g, '&amp;').replace(/"/g, '&quot;') +
      '" allowfullscreen></iframe></body></html>';
    const w = window.open('data:text/html;charset=utf-8,' + encodeURIComponent(launcher), '_blank');
    if (w) {
      opened = true;
      w.focus();
    } else {
      failed = true;
    }
  }
</script>

<Cloak title="DataURL Method" />
<Nav />

<div id="games">
  <main>
    <h2>Notes:</h2>
    <p>
      Click Open below to launch this site in a data: URL tab. The tab created lasts forever, from there, it can
      be re-opened.
    </p>
    <button class="button" on:click={openDataUrl}>Open via DataURL</button>
    {#if opened}
      <p>Launched! If the tab didn't appear, allow pop-ups and try again.</p>
    {/if}
    {#if failed}
      <p>Pop-up blocked — allow pop-ups for this site and try again.</p>
    {/if}
  </main>
</div>
