import { Component, Input } from "@angular/core";
import { PokemonService } from "../service/pokemon.service";

@Component({
  selector: 'app-drawer-poke',
  templateUrl: './drawer-poke.component.html',
  styleUrls: ['./drawer-poke.component.scss'],
})
export class DrawerPokeComponent {
  @Input() pokemonData: any;
  constructor(public pokemonService:PokemonService) {
  };

  ngOnChanges(){
    if(this.pokemonData){
      this.settingInfos(this.pokemonData);
    }
  }

  settingInfos(data:any){
  }
}
