import { AppComponent } from './../app.component';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  constructor(public pokemonService: PokemonService, public appComponent: AppComponent){
  }
}
