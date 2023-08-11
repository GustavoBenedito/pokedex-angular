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
  pokedexLimit = 151;
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
    for(let i = 0; i < this.pokedexLimit; i++){
      if(this.pokemonsDetails[i].id.toString().length < 2){
        this.pokemons[i].id = this.pokemonsDetails[i].id.toString().padStart(3, '0');
      }
      else if(this.pokemonsDetails[i].id.toString().length < 3){
        this.pokemons[i].id = this.pokemonsDetails[i].id.toString().padStart(3, '0');
      }
      else{
        this.pokemons[i].id = this.pokemonsDetails[i].id;
      }
      if(this.pokemonsDetails[i].types.length > 1){
        this.pokemons[i].types = [this.pokemonsDetails[i].types[0].type.name, this.pokemonsDetails[i].types[1].type.name];
      }
      else{
        this.pokemons[i].types = [this.pokemonsDetails[i].types[0].type.name];
      }
    }
  }

  ngOnDestroy() {
    if (this.apiPokeSubscription) {
      this.apiPokeSubscription.unsubscribe();
    }
  }
}


