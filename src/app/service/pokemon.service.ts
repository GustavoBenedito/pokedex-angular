import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription, catchError, forkJoin, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon } from '../Pokemon';
import { prominent } from 'color.js'
import { Injectable } from '@angular/core';

export const BASE_URL = 'https://pokeapi.co/api/v2';

@Injectable()
export class PokemonService{
  pokemons: Array<Pokemon> = [];
  pokeImgList:any = [];
  pokedexLimit = 256;
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
      // versao dos sonhos
      // this.pokemons[i].img =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`;

      //versao oficial
      this.pokemons[i].img =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png`;

      //versao 'de casa'
      // this.pokemons[i].img =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i+1}.png`;

      //versao yellow
      // this.pokemons[i].img =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${i+1}.png`;

      //versao black white
      // this.pokemons[i].img =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${i+1}.png`;

    }
    this.makeAPIColorAverage();
  }

  async makeAPIColorAverage(){
    for(let i = 0; i < this.pokedexLimit; i++){
        this.pokemons[i].color = await prominent(this.pokemons[i].img, {format: 'hex'});
        this.pokemons[i].color = this.pokemons[i].color[1];
    }
  }

  makeAPIPokemonsDetails(){
    for(let i = 0; i < this.pokedexLimit; i++){
      this.pokemons[i].id = this.getPokemonId(this.pokemonsDetails[i]);
      this.pokemons[i].types = this.getPokemonType(this.pokemonsDetails[i]);
    }
  }

  getPokemonId(pokeDetails: any){
    const pokeId = pokeDetails.id.toString();
    if(pokeId.length <= 3){
      return pokeDetails.id.toString().padStart(3, '0');
    }
    return pokeDetails.id;
  }

  getPokemonType(pokeDetails:any){
    return pokeDetails.types.map((pokeDetails: any) => pokeDetails.type.name);
  }

  ngOnDestroy() {
      this.apiPokeSubscription?.unsubscribe();
  }
}


