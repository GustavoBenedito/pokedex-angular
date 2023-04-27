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
  languageListView = false;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.language);
  }

  changeLanguage(language: string): void {
    this.language = language;
    this.translate.use(language);
}
  changeLanguageButton(){
    this.languageListView = !this.languageListView;
}
}