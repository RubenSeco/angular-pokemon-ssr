import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {

  private pokemonsService = inject(PokemonsService)
  public pokemons = signal<SimplePokemon[]>([])
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private title = inject(Title)

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map(params => {
        const page = params.get('page') ?? '1'
        return parseInt(page)
      })

    )
  )

  // public isLoading = signal(true);

  ngOnInit(): void {

    this.loadPokemons()
    // setTimeout(() => {
    //   this.isLoading.set(false)
    // }, 1500);
  }

  public loadPokemons(nextPage = 0) {

    const pageToLoad = this.currentPage()! + nextPage
    this.pokemonsService.loadPage(pageToLoad).pipe(
      tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
      tap(() => this.title.setTitle(`Pokemons - Page ${pageToLoad}`)),
    ).subscribe(pokemons => {
      this.pokemons.set(pokemons)
    })
  }

}



