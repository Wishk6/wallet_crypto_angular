import {Component} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterLink,RouterLinkActive} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {MatIconModule} from "@angular/material/icon";
import {GenericActionButtonComponent} from "../Generics/generic-action-button/generic-action-button.component";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  standalone: true,
  imports: [
    MatSidenavModule,
    BrowserAnimationsModule,
    RouterLink,
    ThemeToggleComponent,
    MatIconModule,
    RouterLinkActive,
    GenericActionButtonComponent],
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  constructor(private authService: AuthenticationService) {
  }

  showFiller = true;

  toggle() {
    this.showFiller = !this.showFiller;
  }

  logout() {
    this.authService.logout();
  }

}
