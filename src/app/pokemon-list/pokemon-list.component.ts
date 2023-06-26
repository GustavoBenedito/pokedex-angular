import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
@Input() imgList: any;
numberPokemon = 151;

ngOnInit(): void {
  this.getPokemonImgList()
  this.getPokemonDataList();
}
getPokemonImgList(){
  const imgPokemonsList= [];
    for(var i = 0; i <= this.numberPokemon; i ++){
      imgPokemonsList.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`);
    }
    this.imgList = imgPokemonsList;
  }
getPokemonDataList(){
  fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then(response => response.json)
  .then(allDataPokemons => console.log(allDataPokemons))
  
  const dataPokemonsList = `https://pokeapi.co/api/v2/pokemon?limit=151`;
  // console.log(dataPokemonsList);
}
}
function fetchPokemonData(arg0: string) {
  throw new Error('Function not implemented.');
}

