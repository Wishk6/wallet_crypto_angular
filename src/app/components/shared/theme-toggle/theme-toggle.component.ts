import {Component,Inject,OnInit} from '@angular/core';
import {AsyncPipe,DOCUMENT,NgClass,NgIf} from "@angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {GenericActionButtonComponent} from "../Generics/generic-action-button/generic-action-button.component";

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
    imports: [
        NgClass,
        NgIf,
        MatSlideToggleModule,
        MatToolbarModule,
        ReactiveFormsModule,
        AsyncPipe,
        MatIconModule,
        GenericActionButtonComponent
    ],
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

  darkTheme: boolean = false; // start with light theme
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    let darkTheme = localStorage.getItem('dark-theme');
    if (darkTheme) {
      this.darkTheme = darkTheme === 'true';
      this.loadStyle();
    } else {
      this.loadStyle();
    }
  }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    this.loadStyle();
  }

  loadStyle() {
    const styleName = this.darkTheme ? 'dark-theme.css' : 'light-theme.css';
    const themeLink = this.document.getElementById('client-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = `assets/${styleName}`;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = `assets/${styleName}`;
      this.document.getElementsByTagName('head')[0].appendChild(style);
    }
    localStorage.setItem('dark-theme',this.darkTheme.toString());
  }

}
