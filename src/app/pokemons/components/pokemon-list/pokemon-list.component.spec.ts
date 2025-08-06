


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonsListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';


const mockPokemons: SimplePokemon[] = [

  {
    id: "1",
    name: 'boulbasaur'
  },

  {
    id: "2",
    name: 'ivysaur'
  }
]

describe('PokemonsListComponent', () => {

  // Declaración global de fixture, compiled y el componente

  let fixture: ComponentFixture<PokemonsListComponent>;
  let compiled: HTMLElement;
  let component: PokemonsListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    // Configuración de fixture, compiled y el componente

    fixture = TestBed.createComponent(PokemonsListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

  });

  it('should create the app', () => {

    fixture.componentRef.setInput("pokemons", [])
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should render the pokemon list with 2 pokemon cards', () => {

    fixture.componentRef.setInput("pokemons", mockPokemons)
    fixture.detectChanges();
    expect(compiled.querySelectorAll("pokemon-card").length).toBe(mockPokemons.length)
  });

  it('should render "No hay pokemons para mostrar"', () => {

    fixture.componentRef.setInput("pokemons", [])
    fixture.detectChanges();
    expect(compiled.querySelector("div")?.textContent).toContain("No hay pokemons para mostrar")
  });


});
