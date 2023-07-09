import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit} from '@angular/core';
import { Subscription, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon } from '../Pokemon';

interface PokeAPIResponse {
  count: number,
  next: string,
  previous: string,
  results: Array<Pokemon>
}
@Injectable()
export class PokemonService{
  pokemons: Array<Pokemon> = [];
  pokedexNumber = 6;
  apiPokeUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${this.pokedexNumber}&offset=0`;

  constructor(private http: HttpClient){
    try{
      this.getAllPokemonData().subscribe(
        (results: Array<Pokemon>) => {
          this.pokemons = results;
          console.log(this.pokemons);
      });
    }
    catch(error){
      console.log('Failed to get Pokemon data', error);
    }
  }

  getAllPokemonData(): Observable<Array<Pokemon>> {
      return this.http.get<any>(this.apiPokeUrl)
      .pipe(map((response:PokeAPIResponse) => response.results));
}

  // async getColorPokemon(pokeID:any){
  //   try{
  //     const getPokeColor = await this.http.get<any>
  //     (`https://pokeapi.co/api/v2/pokemon-species/${pokeID}/`).toPromise();
  //     const teste = getPokeColor.color.name;
  //     return teste;
  //   }
  //   catch(error){
  //     console.log('Error in get Pokemon color' + error);
  //   }
  // }
}
