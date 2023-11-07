export interface Pokemon {
  id: string;
  name: string;
  url: string;
  img: string;
  color: any;
  types: Array<string>;
  height: number;
  weight: number;
  stats: statsPoke;
}

export interface statsPoke {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}
