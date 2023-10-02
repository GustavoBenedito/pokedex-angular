import { Component } from "@angular/core";
import { PokemonService } from "../service/pokemon.service";

@Component({
  selector: 'app-drawer-poke',
  templateUrl: './drawer-poke.component.html',
  styleUrls: ['./drawer-poke.component.scss'],
})
export class DrawerPokeComponent {
  constructor(public pokemonService: PokemonService) {};

  ngOnInit(){
  }

  getDataForDrawer(pokemonData: any){
    console.log(pokemonData);
  }
}
