import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {AuthenticatedGuard} from "../authenticated.guard";
import {AuthenticationComponent} from "./components/views/authentication/authentication.component";
import {HomeComponent} from "./components/views/home/home.component";
import {WalletComponent} from "./components/views/wallet/wallet.component";
import {GraphicsComponent} from "./components/views/graphics/graphics.component";

const routes: Routes = [
  {path: 'login',component: AuthenticationComponent},
  {path: 'home',component: HomeComponent,canActivate: [AuthenticatedGuard]},
  {path: 'wallet',component: WalletComponent,canActivate: [AuthenticatedGuard]},
  {path: 'graphics',component: GraphicsComponent,canActivate: [AuthenticatedGuard]},
  {path: '**',redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

