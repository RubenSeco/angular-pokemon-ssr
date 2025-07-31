import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {

  private pokemonsService = inject(PokemonsService)

  readonly pokemons = signal<SimplePokemon[]>([])

  // public isLoading = signal(true);

  ngOnInit(): void {

    this.loadPokemons()
    // setTimeout(() => {
    //   this.isLoading.set(false)
    // }, 1500);
  }

  public loadPokemons(nextPage = 0) {
    this.pokemonsService.loadPage(nextPage).subscribe(pokemons => {
      this.pokemons.set(pokemons)
    })
  }

}



