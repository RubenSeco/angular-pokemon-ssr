import { Routes } from '@angular/router';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [
  {
    path: "pokemons",
    loadComponent: () => import("./pages/pokemons/pokemons-page.component")
  },
  {
    path: "pokemon/:id",
    loadComponent: () => import("./pages/pokemon/pokemon-page.component"),
    data: {
      renderMode: RenderMode.Prerender
    }
  },
  {
    path: "about",
    loadComponent: () => import("./pages/about/about-page.component")
  },
  {
    path: "contact",
    loadComponent: () => import("./pages/contact/contact-page.component")
  },
  {
    path: "pricing",
    loadComponent: () => import("./pages/pricing/pricing-page.component")
  },
  {
    path: "**",
    redirectTo: "about"
  }
];
