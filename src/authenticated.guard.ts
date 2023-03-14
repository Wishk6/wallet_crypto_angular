import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "./app/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard {
  constructor(private authService: AuthenticationService,private router: Router) {
  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('true');
      return false;
    } else {
      this.router.navigate(['/login']);
      return true;
    }
  }

}
