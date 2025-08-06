


import { TestBed } from "@angular/core/testing";
import { PokemonsService } from "./pokemons.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokeAPIResponse } from "../interfaces";
import { catchError } from "rxjs";


const mockPokeApiResponse: PokeAPIResponse = {
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": "",
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    }
  ]
}

const expectedPokemon = [
  {
    name: "bulbasaur",
    id: "1",
  },
  {
    name: "ivysaur",
    id: "2",
  }
]
const mockPokemon = {
  name: "bulbasaur",
  id: "1",
}

describe("PokemonsService", () => {

  let service: PokemonsService;
  let httpMock: HttpTestingController

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', () => {

    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemon)
    })

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
    expect(req.request.method).toBe("GET")

    req.flush(mockPokeApiResponse)
  });

  it('should load page 5 of SimplePokemons', () => {

    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemon)
    })

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=80`)
    expect(req.request.method).toBe("GET")

    req.flush(mockPokeApiResponse)
  });

  it('should load a Pokemon by ID', () => {

    const pokemonId = "1"
    service.loadPokemon(pokemonId).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon)
    })

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    expect(req.request.method).toBe("GET")

    req.flush(mockPokemon)


  });

  it('should load a Pokemon by name', () => {

    const pokemonName = "bulbasaur"
    service.loadPokemon(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon)
    })

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    expect(req.request.method).toBe("GET")

    req.flush(mockPokemon)


  });

  // Disparar errores

  it('should catch errors if pokemon not found', () => {

    const pokemonName = "yo-no-existo"
    service.loadPokemon(pokemonName).pipe(
      catchError((error) => {
        expect(error.message).toContain("Pokemon not found")
        return [];
      })
    ).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon)
    })

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    expect(req.request.method).toBe("GET")

    req.flush("Pokemon not found", {
      status: 404,
      statusText: "Not Found"
    })
  });
})

