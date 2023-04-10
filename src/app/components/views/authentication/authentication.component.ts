import {Component,OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {AnimationItem} from 'lottie-web';
import {AnimationOptions} from 'ngx-lottie';
import {Router} from "@angular/router";
import {WalletService} from "../../../services/wallet.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/towerAnimation.json',
  };

  constructor(private toaster: ToastrService, private authService: AuthenticationService,private walletService : WalletService,private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  login(email: string,password: string) {
    this.authService.login(email,password).subscribe({
      next: (data) => {
        this.toaster.success('Hello ' + this.authService.userPseudoValue + ' !');
        localStorage.setItem('wallet_access_token',data);
        this.walletService.updateCrypto().subscribe()
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        this.toaster.error('Error while trying to login, ' + error.error.message);
      }
    });
  }

}

