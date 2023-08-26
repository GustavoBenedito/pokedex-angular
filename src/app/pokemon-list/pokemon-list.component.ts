import { AppComponent } from './../app.component';
import { PokemonService } from '../service/pokemon.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  constructor(public pokemonService: PokemonService, public appComponent: AppComponent){
  }
}
