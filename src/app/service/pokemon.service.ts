import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  dataList = [];
  colorList = []
  numberPokemon: any;
  
  constructor(private httpCLient: HttpClient){
    this.getPokemonDataList(); 
  }

  async getPokemonDataList(){
    try{
      const getDataPokemonsList = await this.httpCLient.get<any>
      ('https://pokeapi.co/api/v2/pokemon?limit=151').toPromise();
      this.dataList = getDataPokemonsList.results;
    }
    catch (error){
      console.log('error' + error);
    }
  }

  async getPokemonColorList(){
    try{
      const getColorPokemonsList = await this.httpCLient.get<any>
      ('https://pokeapi.co/api/v2/pokemon-colorlimit=151').toPromise();
      this.colorList = getColorPokemonsList.results;
    }
    catch (error){
      console.log('error' + error);
    }
  }
}
