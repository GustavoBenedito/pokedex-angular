import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit} from '@angular/core';
import { Subscription, catchError, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon } from '../Pokemon';
import { average } from 'color.js'

interface PokeAPIResponse {
  count: number,
  next: string,
  previous: string,
  results: Array<Pokemon>
}
export const BASE_URL = 'https://pokeapi.co/api/v2';

@Injectable()
export class PokemonService{
  pokemons: Array<Pokemon> = [];
  pokeImgList:any = [];
  pokedexLimit = 5;

  apiPokeUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${this.pokedexLimit}&offset=0`;
  PokeImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`;
  private apiPokeSubscription: Subscription = new Subscription;
  constructor(private http: HttpClient){
  }

  getAllPokemonData(): Observable<Array<Pokemon>> {
    const params = new HttpParams()
    .set('limit', this.pokedexLimit);
    return this.http
      .get<any>(`${BASE_URL}/pokemon`, { observe: 'response', params: params })
      .pipe(
        map(res => res.body.results),
        catchError(error => of(error.url))
      );
}

  getPokemonImgList(){
    for(let i = 0; i < this.pokedexLimit; i++){
      console.log(this.pokemons);
      this.pokemons[i].img =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`;
    }
  }
  ngOnDestroy() {
    if (this.apiPokeSubscription) {
      this.apiPokeSubscription.unsubscribe();
    }
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


