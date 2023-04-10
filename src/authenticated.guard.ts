import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot,Router,RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "./app/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard {
  constructor(private authService: AuthenticationService,private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.authService.logout();
      return false;
    }
  }

}
