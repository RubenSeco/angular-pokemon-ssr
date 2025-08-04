import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server
  },
  {
    path: "pokemons/page/:page",
    renderMode: RenderMode.Prerender,
    getPrerenderParams() {
      const pages = ["1", "2", "3", "4", "5"];
      return Promise.resolve(pages.map((page) => ({ page })));
    },
  }
];

