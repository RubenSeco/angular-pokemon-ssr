import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {

  private pokemonsService = inject(PokemonsService)
  public pokemons = signal<SimplePokemon[]>([])
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private title = inject(Title)

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map((page) => isNaN(page) ? 1 : page),
      map((page) => Math.max(page, 1))
    ),
  )

  public loadOnPageChanged = effect(() => {

    this.loadPokemons(this.currentPage())
  })



  // public isLoading = signal(true);

  // ngOnInit(): void {

  //   this.loadPokemons()
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false)
  //   // }, 1500);
  // }

  public loadPokemons(nextPage = 0) {

    const pageToLoad = this.currentPage()!
    this.pokemonsService.loadPage(pageToLoad).pipe(
      // tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
      tap(() => this.title.setTitle(`Pokemons - Page ${pageToLoad}`)),
    ).subscribe(pokemons => {
      this.pokemons.set(pokemons)
    })
  }

}



