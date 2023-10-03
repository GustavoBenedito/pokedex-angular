import {TranslateService} from "@ngx-translate/core";
import { PokemonService } from './service/pokemon.service';
import { Pokemon } from './Pokemon';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerPokeComponent } from "./drawer-poke/drawer-poke.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  langs = ['en','pt-br'];
  language = this.langs[1];
  languageListView = false;
  pokemons: Array<Pokemon> = [];
  shouldViewDrawer = false;
  pokemonData: any;
  
  constructor(private translate: TranslateService, public pokemonService: PokemonService, public drawerPokeComponent: DrawerPokeComponent) {
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
    this.pokemonService.getAPIAllPokemonData().subscribe(
      (pokemons: Array<Pokemon>) => {
        for(let pokemon of pokemons){
          this.pokemons.push(pokemon);
        }
        this.getPokemonList();
        this.getPokemonsDetails();
      });
  }

  getPokemonList(){
    this.pokemonService.pokemons = this.pokemons;
    this.pokemonService.makeAPIPokemonImgList();
  }

  getPokemonsDetails(){
    this.pokemonService.getAPIPokemonsDetails().subscribe(
      (res) => {
        this.pokemonService.pokemonsDetails = res;
        this.pokemonService.makeAPIPokemonsDetails();
    }
    );
  }

  openDrawer(pokemonData: any): void {
    this.pokemonData = pokemonData;
    this.drawer.toggle();
  }
}
