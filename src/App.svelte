<script>
  import Router from 'svelte-spa-router';
  import Gateway from './pages/Gateway.svelte';
  import Home from './pages/Home.svelte';
  import Games from './pages/Games.svelte';
  import Tools from './pages/Tools.svelte';
  import Settings from './pages/Settings.svelte';
  import Disclaimer from './pages/Disclaimer.svelte';
  import GamePlayer from './pages/GamePlayer.svelte';
  import ToolPlayer from './pages/ToolPlayer.svelte';
  import AboutBlank from './pages/AboutBlank.svelte';
  import BlobCloak from './pages/BlobCloak.svelte';
  import DataUrlCloak from './pages/DataUrlCloak.svelte';
  import NotFound from './pages/NotFound.svelte';

  // Clean routes first; legacy .html / old-name aliases point at the same
  // components so old bookmarks keep working (e.g. /select.html -> Games).
  const routes = {
    '/': Gateway,
    '/home': Home,
    '/start': Home,
    '/start.html': Home,
    '/games': Games,
    '/select': Games,
    '/select.html': Games,
    '/tools': Tools,
    '/tools.html': Tools,
    '/tools/:slug': ToolPlayer,
    '/play/:slug': GamePlayer,
    '/settings': Settings,
    '/settings.html': Settings,
    '/disclaimer': Disclaimer,
    '/disclaimer.html': Disclaimer,
    '/cloak/about-blank': AboutBlank,
    '/cloak/blob': BlobCloak,
    '/cloak/data-url': DataUrlCloak,
    '/launch': AboutBlank,
    '/launch.html': AboutBlank,
    '/blob': BlobCloak,
    '/blob.html': BlobCloak,
    '/dataurl': DataUrlCloak,
    '/dataurl.html': DataUrlCloak,
    '*': NotFound
  };
</script>

<Router {routes} />
