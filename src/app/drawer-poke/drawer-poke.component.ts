import { Component } from '@angular/core';

@Component({
  selector: 'app-drawer-poke',
  templateUrl: './drawer-poke.component.html',
  styleUrls: ['./drawer-poke.component.scss'],
})
export class DrawerPokeComponent {
  shouldViewDrawer = false;
  constructor() {};

  openDrawer(pokeId: any) {
    this.shouldViewDrawer = true;
    console.log(this.shouldViewDrawer, pokeId);
  }
}
