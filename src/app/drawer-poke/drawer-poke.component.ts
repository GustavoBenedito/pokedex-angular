import { Component, Input } from "@angular/core";
import { PokemonService } from "../service/pokemon.service";

@Component({
  selector: 'app-drawer-poke',
  templateUrl: './drawer-poke.component.html',
  styleUrls: ['./drawer-poke.component.scss'],
})
export class DrawerPokeComponent {
  @Input() pokemonData: any;
  constructor(public pokemonService: PokemonService) {
  };

  ngOnInit(){
    console.log(this.pokemonData);
    if(this.pokemonData){
      this.getDrawerData(this.pokemonData);
    }
  }

  getDrawerData(pokemonData:any){
    console.log(pokemonData);
  }
}
