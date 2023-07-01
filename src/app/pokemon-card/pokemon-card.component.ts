import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  img: any;
  @Input()
  pokemon: any;
  @Input()
  pokedexNumber: any;
  @Input()
  pokeDataList: any;

  ngOnInit(): void {
    console.log(this.pokemon, this.pokemon.color);
  }

  getPokemonImgList() {
    const numberFormat = this.loadingImgsIndex(this.pokedexNumber);
    document.documentElement.style.setProperty('--colorBackgroundPoke', this.pokemon.color);
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${numberFormat}.png`;
  }

  loadingImgsIndex(str: string | number, size = 3): string {
    let s = String(str);

    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  }
}
