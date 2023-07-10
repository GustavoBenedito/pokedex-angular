import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Subscription, catchError, forkJoin, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon } from '../Pokemon';
import { prominent } from 'color.js'

export const BASE_URL = 'https://pokeapi.co/api/v2';

@Injectable()
export class PokemonService{
  pokemons: Array<Pokemon> = [];
  pokeImgList:any = [];
  pokedexLimit = 7;
  pokemonsDetails:any = {};

  private apiPokeSubscription: Subscription = new Subscription;

  constructor(private http: HttpClient){
  }

  getAPIAllPokemonData(): Observable<Array<Pokemon>> {
    const params = new HttpParams()
    .set('limit', this.pokedexLimit);
    return this.http
      .get<any>(`${BASE_URL}/pokemon`, { observe: 'response', params: params })
      .pipe(
        map(res => res.body.results),
        catchError(error => of(error.url))
      );
  }

  getAPIPokemonsDetails(): Observable<Array<string>> {
    const observables = [];
    for(let i = 0; i < this.pokedexLimit; i++){
      observables.push(this.http.get<any>(`${this.pokemons[i].url}`).pipe(map(res => res), catchError(err => of(err.url))));
    }
    return forkJoin(observables);
  }
  ngOnDestroy() {
    if (this.apiPokeSubscription) {
      this.apiPokeSubscription.unsubscribe();
    }
  }

  makeAPIPokemonImgList(){
    for(let i = 0; i < this.pokedexLimit; i++){
      this.pokemons[i].img =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png`;
    }
    this.makeAPIColorAverage();
  }

  async makeAPIColorAverage(){
    for(let i = 0; i < this.pokedexLimit; i++){
       this.pokemons[i].color = await prominent(this.pokemons[i].img, {format: 'hex'});
       this.pokemons[i].color = this.pokemons[i].color[1]
    }
  }

  makeAPIPokemonsDetails(){
    console.log(
    this.pokemonsDetails
    );
    for(let i = 0; i < this.pokedexLimit; i++){
      this.pokemons[i].id = this.pokemonsDetails[i].id;
      this.pokemons[i].types = this.pokemonsDetails[i].types;
    }
    console.log(this.pokemons);
  }
}


