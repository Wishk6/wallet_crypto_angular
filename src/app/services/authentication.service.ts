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

  constructor(private http: HttpClient,private jwtService: JwtService,private router: Router) {
  }

  login(email: string,password: string): Observable<string> {
    return this.http.post<any>(environment.api_url+`authentication/login`,{email,password})
      .pipe(map(data => {
        if (data.token) {
          localStorage.setItem('wallet_access_token',JSON.stringify(data.token));
          this.router.navigate(['/home']);
        }
        return data.token;
      }));
  }

  logout(): void {
    localStorage.removeItem("wallet_access_token");
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {

    const token = localStorage.getItem("wallet_access_token");

    if (token !== null) {
      return (localStorage.getItem("wallet_access_token") !== null) || !this.jwtService.isTokenExpired(token);
    } else {
      return false;
    }

  }

}
