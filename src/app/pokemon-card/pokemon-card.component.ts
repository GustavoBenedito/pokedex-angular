import { PokemonService } from '../service/pokemon.service';
import { DrawerPokeComponent } from '../drawer-poke/drawer-poke.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  constructor(
    public pokemonService: PokemonService,
    public drawerPokeComponent: DrawerPokeComponent,
    public homePageComponent: HomePageComponent,
  ) {}

  img: any;
  @Input()
  pokemon: any;
  @Input()
  pokedexLimit: any;

  openDrawerPoke(pokeId: any) {
    this.homePageComponent.openDrawer(pokeId);
  }
}
