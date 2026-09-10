<script>
  import { location, push } from 'svelte-spa-router';

  const base = import.meta.env.BASE_URL || './';
  const icon = (name) => base + 'media/nav-buttons/' + name + '.svg';

  const items = [
    { to: '/home', icon: 'home', label: 'Home' },
    { to: '/games', icon: 'game', label: 'Games' },
    { to: '/tools', icon: 'tools', label: 'Tools' },
    { to: '/settings', icon: 'settings', label: 'Settings' },
    { to: '/disclaimer', icon: 'disclaimer', label: 'Disclaimer' }
  ];

  // Mirror the original aria-current="page" highlight, including
  // player routes belonging to the games/tools sections.
  function isCurrent(path, to) {
    if (to === '/home') return path === '/home' || path === '/start' || path === '/start.html';
    if (to === '/games')
      return (
        path === '/games' ||
        path === '/select' ||
        path === '/select.html' ||
        path.startsWith('/play/')
      );
    if (to === '/tools')
      return (
        path === '/tools' ||
        path === '/tools.html' ||
        (path.startsWith('/tools/') && path !== '/tools')
      );
    if (to === '/settings') return path === '/settings' || path === '/settings.html';
    if (to === '/disclaimer') return path === '/disclaimer' || path === '/disclaimer.html';
    return false;
  }
</script>

<nav>
  {#each items as item}
    <button
      type="button"
      class="nav-btn"
      aria-current={isCurrent($location, item.to) ? 'page' : undefined}
      aria-label={item.label}
      on:click={() => push(item.to)}
    >
      <img src={icon(item.icon)} width="40px" height="40px" alt={item.label} />
    </button>
  {/each}
</nav>
