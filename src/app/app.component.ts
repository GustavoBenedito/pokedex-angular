import {TranslateService} from "@ngx-translate/core";
import { PokemonService } from './service/pokemon.service';
import { Subscription } from 'rxjs';
import { Pokemon } from './Pokemon';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  langs = ['en','pt-br'];
  language = this.langs[1];
  languageListView = false;

  private apiPokeSubscription: Subscription = new Subscription;
  pokemons: Array<Pokemon> = [];

  constructor(private translate: TranslateService, public pokemonService: PokemonService) {
    translate.setDefaultLang(this.language);
  }

  changeLanguage(language: string): void {
    this.language = language;
    this.translate.use(language);
  }
  changeLanguageButton(){
    this.languageListView = !this.languageListView;
  }

  ngOnInit(){
    this.pokemonService.getAllPokemonData().subscribe(
      (pokemons: Array<Pokemon>) => {
        for(let pokemon of pokemons){
          this.pokemons.push(pokemon);
        }
        this.getPokemonList();
      });
  }

  getPokemonList(){
    this.pokemonService.pokemons = this.pokemons;
    this.pokemonService.getPokemonImgList();
  }
}
