import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
  @Input()
  pokemons:any;
  shouldViewDrawer = false;

  constructor(public translate: TranslateService) {
  }

  openDrawer(pokeId: any) {
    this.shouldViewDrawer = true;
    console.log(this.shouldViewDrawer, pokeId);
  }
}
