import {Component,OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {AnimationItem} from 'lottie-web';
import {AnimationOptions} from 'ngx-lottie';
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/towerAnimation.json',
  };

  constructor(private authService: AuthenticationService,private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  login(email: string,password: string) {
    this.authService.login(email,password).subscribe({
      next: (data) => {
        localStorage.setItem('wallet_access_token',data);
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
      }
    });
  }

}

