// Tool catalog: first 4 are the visible DotGUI/tools.html tiles; last 2 existed as
// pages/tool-pages/*.html but were unlinked — surfaced here so nothing is lost.
export const tools = [
  {
    "slug": "simplecalculator",
    "title": "Calculator",
    "key": "Calculator",
    "img": "media/tool-buttons/calc.jpg",
    "embed": "https://fvuiaosvhsfasjdfsagp.netlify.app/apps/calculator/",
    "external": true
  },
  {
    "slug": "wavesai",
    "title": "Waves AI",
    "key": "AI",
    "img": "media/tool-buttons/ai.jpg",
    "embed": "https://fsdsfasdsdagsagsdgwag.vercel.app/",
    "external": true
  },
  {
    "slug": "pico",
    "title": "PICO-8",
    "key": "Pico 8",
    "img": "media/tool-buttons/pico8.png",
    "embed": "tool-embeds/pico8.html",
    "external": false
  },
  {
    "slug": "sandstone",
    "title": "Sandstone Proxy",
    "key": "Sandstone",
    "img": "media/tool-buttons/sandstone.png",
    "embed": "tool-pages/sandstone.html",
    "external": false
  },
  {
    "slug": "ruffleemulator",
    "title": "Ruffle Emulator",
    "key": "Ruffle",
    "img": "",
    "embed": "tool-embeds/ruffle.html",
    "external": false
  },
  {
    "slug": "soundboard",
    "title": "Soundboard",
    "key": "Soundboard",
    "img": "",
    "embed": "https://fvuiaosvhsfasjdfsagp.netlify.app/apps/thirtydollarwebsite/",
    "external": true
  }
];

export function findTool(slug) {
  return tools.find((t) => t.slug === slug);
}
