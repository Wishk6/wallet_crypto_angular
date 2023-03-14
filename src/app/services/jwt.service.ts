import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class JwtService {
   static tokenGetter() {
    return localStorage.getItem("wallet_access_token");
  }
  constructor(private jwtHelper: JwtHelperService) {}


  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  getTokenExpirationDate(token: string): Date {
    return <Date>this.jwtHelper.getTokenExpirationDate(token);
  }

}
