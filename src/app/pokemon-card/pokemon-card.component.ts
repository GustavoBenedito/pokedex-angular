import { Component, Input } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  constructor(public pokemonService: PokemonService) {
  }

  img: any;
  @Input()
  pokemon: any;
  @Input()
  pokedexLimit: any;

   ngOnInit(){
    console.log(this.pokemon)
   }
}
