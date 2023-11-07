import { Pokemon } from './../Pokemon';
import { AppComponent } from './../app.component';
import { PokemonService } from '../service/pokemon.service';
import { DrawerPokeComponent } from '../drawer-poke/drawer-poke.component';
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
    public appComponent: AppComponent,
  ) {}

  img: any;
  @Input() pokemon: any;
  @Input() pokedexLimit: any;

  openDrawer(pokemonData: any){
    this.appComponent.openDrawer(pokemonData);
  }
}
