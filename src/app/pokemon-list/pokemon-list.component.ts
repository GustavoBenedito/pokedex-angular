import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
imgList: any;
  getPokemonImg(){
    console.log('teste');
    const imgPokemonsList= [];
      for(var i = 0; i <= 151; i ++){
        imgPokemonsList.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`);
      }
      this.imgList = imgPokemonsList;
      console.log(this.imgList);
    }
}
