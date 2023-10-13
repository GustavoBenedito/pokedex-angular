import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-drawer-poke',
  templateUrl: './drawer-poke.component.html',
  styleUrls: ['./drawer-poke.component.scss'],
})
export class DrawerPokeComponent {
  @Input() pokemonData: any;
  constructor() {
  };

  ngOnInit(){
    if(this.pokemonData){
      this.getDrawerData(this.pokemonData);
    }
  }

  getDrawerData(pokemonData:any){
    console.log(pokemonData);
  }
}
