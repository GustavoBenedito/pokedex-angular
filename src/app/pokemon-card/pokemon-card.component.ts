import { Component, Input } from '@angular/core';
import ColorThief from "color-thief-ts";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  constructor() { }

  img: any;
  @Input()
  pokemon: any;
  @Input()
  pokedexNumber: any;

  ngOnInit(): void {
    // console.log(this.pokemon, this.pokemon.color);
  }

  getPokemonImgList() {
    const numberFormat = this.loadingImgsIndex(this.pokedexNumber);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${numberFormat}.png`
    return image;
  }

  loadingImgsIndex(str: string | number, size = 3): string {
    let s = String(str);

    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  }


}
