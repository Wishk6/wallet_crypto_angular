import {Component} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  standalone: true,
  imports: [MatSidenavModule,BrowserAnimationsModule,RouterLink],
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  constructor(private authService:AuthenticationService) {
  }

  showFiller = true;

  toggle() {
    this.showFiller = !this.showFiller;
  }
  logout() {
    this.authService.logout();
  }

}
