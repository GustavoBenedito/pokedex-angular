import { Component, Injectable, Input } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { DrawerPokeComponent } from '../drawer-poke/drawer-poke.component';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  constructor(
    public pokemonService: PokemonService,
    public drawerPokeComponent: DrawerPokeComponent
  ) {}

  img: any;
  @Input()
  pokemon: any;
  @Input()
  pokedexLimit: any;

  openDrawerPoke(pokeId: any) {
    this.drawerPokeComponent.openDrawer(pokeId);
  }
}
