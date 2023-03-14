import {Component} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  options: AnimationOptions = {
    path: '/assets/towerAnimation.json',
  };

  constructor(private authService: AuthenticationService,private router : Router) {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

   login(email: string,password: string) {
    this.authService.login(email,password).subscribe({
      complete: () => {
        console.log('complete');
        this.router.navigate(['/']).then(r => console.log(r));
      },
      error: (error) => {
        console.log('error');
      }
    });
  }

}

