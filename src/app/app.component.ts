import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  langs = ['en','pt-br'];
  language = this.langs[1];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.language);
    console.log(this.language);
    translate.use(this.language);
  }

  changeLanguage(event: string): void{
    console.log(event); 
    this.translate.setDefaultLang(event);
    this.translate.use(event);
    console.log(this.translate); 
  }

  useLanguage(language: string): void {
    console.log(language);
    this.translate.use(language);
}
}