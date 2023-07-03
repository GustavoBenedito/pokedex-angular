import { PokeDataInfoService } from './../poke-data-info.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokeList = [];
  pokedexNumber = 5;
  pokeDataList: any = [];

  constructor(private httpCLient: HttpClient){
    this.getPokemonData();
  }

  async getPokemonData(){
    try{
      for(let i = 1; i <= this.pokedexNumber; i++){
        const getPokemonData = await this.httpCLient.get<any>
        (`https://pokeapi.co/api/v2/pokemon/${i}`).toPromise();
        getPokemonData.color = await this.getColorPokemon(i);
        this.pokeDataList.push(getPokemonData);
      }
    }
    catch(error){
      console.log('Error in get Pokemon data' + error);
    }
  }

  async getColorPokemon(pokeID:any){
    try{
      const getPokeColor = await this.httpCLient.get<any>
      (`https://pokeapi.co/api/v2/pokemon-species/${pokeID}/`).toPromise();
      const teste = getPokeColor.color.name;
      return teste;
    }
    catch(error){
      console.log('Error in get Pokemon color' + error);
    }
  }
}
