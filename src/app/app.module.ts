import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthenticationComponent} from './components/core/authentication/authentication.component';
import {HomeComponent} from './components/core/home/home.component';
import {WalletComponent} from './components/core/wallet/wallet.component';
import {GraphicsComponent} from './components/core/graphics/graphics.component';
import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';
import {environment} from "../environments/environment";

export function tokenGetter() {
  return localStorage.getItem("wallet_access_token");
}

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    WalletComponent,
    GraphicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LottieModule.forRoot({player: playerFactory}),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedRoutes,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
