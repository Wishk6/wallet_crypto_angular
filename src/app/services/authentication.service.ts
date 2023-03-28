import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map,Observable} from "rxjs";
import {JwtService} from "./jwt.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userPseudo: string | undefined;

  constructor(private http: HttpClient,private jwtService: JwtService,private router: Router) {
  }

  login(email: string,password: string): Observable<string> {
    return this.http.post<any>(environment.api_url + `authentication/login`,{email,password})
      .pipe(map(data => {
        if (data.token) {
          this.setUserPseudo(data.token);
          return data.token;
        }
      }));
  }

  logout(): void {
    localStorage.removeItem("wallet_access_token");
    this.router.navigate(['/login']);
  }

  /**
   * Check if the user is logged in, return true if the user is logged in, false otherwise
   * @return boolean
   */
  isLoggedIn(): boolean {

    const token = localStorage.getItem("wallet_access_token");

    if (token !== null) {
      return !this.jwtService.isTokenExpired(token); // isTokenExpired() return true if token is expired
    } else {
      return false;
    }

  }

  get userPseudoValue(): string | undefined {
    return this.userPseudo;
  }

  setUserPseudo(value: string) {
    this.userPseudo = this.jwtService.decodeToken(value).pseudo;
  }

}
