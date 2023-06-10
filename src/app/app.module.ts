import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS,HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthenticationComponent} from './components/views/authentication/authentication.component';
import {HomeComponent} from './components/views/home/home.component';
import {WalletComponent} from './components/views/wallet/wallet.component';
import {GraphicsComponent} from './components/views/graphics/graphics.component';
import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';
import {environment} from "../environments/environment";
import {SideNavComponent} from './components/shared/side-nav/side-nav.component';
import {ErrorInterceptor} from "./services/error.interceptor";
import {AddCryptocurrencyComponent} from './components/shared/add-cryptocurrency/add-cryptocurrency.component';
import {
  CryptocurrencyTableDataComponent
} from './components/shared/cryptocurrency-table-data/cryptocurrency-table-data.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ToastrModule} from 'ngx-toastr';
import {ThemeToggleComponent} from "./components/shared/theme-toggle/theme-toggle.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GenericTvWidget} from "./components/shared/Generics/generic-tv-widget/generic-tv-widget.component";
import {MatButtonModule} from "@angular/material/button";
import {
  GenericActionButtonComponent
} from "./components/shared/Generics/generic-action-button/generic-action-button.component";
import {GenericCardComponent} from "./components/shared/Generics/generic-card/generic-card.component";
import {StatisticsCardComponent} from './components/shared/statistics-card/statistics-card.component';
import {
  GenericValueColorationComponent
} from './components/shared/Generics/generic-pourcentage-widget/generic-value-coloration.component';
import {LinksBarComponent} from './components/shared/links-bar/links-bar.component';

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
    GraphicsComponent,
    StatisticsCardComponent,
    LinksBarComponent
  ],
  imports: [
    SideNavComponent,
    CryptocurrencyTableDataComponent,
    AddCryptocurrencyComponent,
    BrowserModule,
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    LottieModule.forRoot({player: playerFactory}),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedRoutes,
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    ThemeToggleComponent,
    BrowserAnimationsModule,
    GenericTvWidget,
    MatButtonModule,
    GenericActionButtonComponent,
    GenericCardComponent,
    GenericValueColorationComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
