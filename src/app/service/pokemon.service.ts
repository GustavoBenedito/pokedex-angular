import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription, catchError, forkJoin, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon, statsPoke } from '../Pokemon';
import { prominent } from 'color.js'
import { Injectable } from '@angular/core';

export const BASE_URL = 'https://pokeapi.co/api/v2';

@Injectable()
export class PokemonService{
  pokemons: Array<Pokemon> = [];
  pokedexLimit = 6;

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

  async getAllPokeDetails(pokeDetails: any){
    for(let i = 0; i < this.pokedexLimit; i++){
      this.pokemons[i].id = this.getPokemonId(pokeDetails[i]);
      this.pokemons[i].img = this.getPokeImg(pokeDetails[i].id);
      this.pokemons[i].types = this.getPokemonType(pokeDetails[i]);
      this.pokemons[i].color = await this.getPokeColorAverage(this.pokemons[i].img);
      this.pokemons[i].height = this.getPokeHeight(pokeDetails[i].height);
      this.pokemons[i].weight = this.getPokeWeight(pokeDetails[i].weight);
      this.pokemons[i].stats = this.getStatsPoke(pokeDetails[i].stats);
    }
    return this.pokemons;
  }

  getPokeImg(pokeId: string){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
  }

  async getPokeColorAverage(pokeImg: string){
    const color = await prominent(pokeImg, {format: 'hex'});
    return color[1];
  }

  getPokemonId(pokeDetails: any) {
    const pokeId = pokeDetails.id.toString();
    return pokeId.length <= 3 ? pokeDetails.id.toString().padStart(3, '0') : pokeDetails.id;
  }

  getPokemonType(pokeDetails:any){
    return pokeDetails.types.map((pokeDetails: any) => pokeDetails.type.name);
  }

  getPokeHeight(pokeHeight:number){
    return pokeHeight/10;
  }

  getPokeWeight(pokeWeight:number){
    return pokeWeight/10;
  }
  getStatsPoke(stat: any){
    const stats:statsPoke = {
      hp: stat[0].base_stat,
      attack: stat[1].base_stat,
      defense: stat[2].base_stat,
      specialAttack: stat[3].base_stat,
      specialDefense: stat[4].base_stat,
      speed: stat[5].base_stat,
    }
    return stats;
  }

  ngOnDestroy() {
      this.apiPokeSubscription?.unsubscribe();
  }
}
