import {Component,OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {AnimationOptions} from 'ngx-lottie';
import {Router} from "@angular/router";
import {WalletService} from "../../../services/wallet.service";
import {ToastrService} from 'ngx-toastr';
import {FormControl,FormGroup,Validators} from "@angular/forms";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})

export class AuthenticationComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/towerAnimation.json',
  };

  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
  });

  signUpFormGroup: FormGroup = new FormGroup({
    pseudo: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
  });

  errorMessages = {

    email: [
      {type: 'required',message: 'Email requis'},
      {type: 'email',message: 'Veuillez entrer une adresse email valide'}
    ],pseudo: [
      {type: 'required',message: 'Un pseudo est requis'}
    ],
    password: [
      {type: 'required',message: 'Mot de passe requis'},
      {type: 'minlength',message: 'Le mot de passe doit contenir au moins 8 caractères'}
    ]
  };

  wantToSignUp: boolean = false;

  constructor(private toaster: ToastrService,private authService: AuthenticationService,private walletService: WalletService,private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    console.log(this.loginFormGroup.value,"on submit");
  }

  login() {

    if (this.loginFormGroup.get('email')?.value && this.loginFormGroup.get('password')?.value) {
      this.authService.login(this.loginFormGroup.get('email')?.value,this.loginFormGroup.get('password')?.value).subscribe({
        next: (data) => {
          this.toaster.success('Hello ' + this.authService.userPseudoValue + ' !');
          localStorage.setItem('wallet_access_token',data);
          this.walletService.updateCrypto().subscribe()
          this.router.navigateByUrl('/home');
        },
        error: (error) => {
          this.toaster.error(error.error.message,'Error while trying to login');
        }
      });
    } else {
      this.toaster.error('Please enter a valid email and password');
    }
  }

  signUp() {
    if (this.signUpFormGroup.get('email')?.value && this.signUpFormGroup.get('pseudo')?.value && this.signUpFormGroup.get('password')?.value) {
      this.authService.signUp(this.signUpFormGroup.get('email')?.value,this.signUpFormGroup.get('pseudo')?.value,this.signUpFormGroup.get('password')?.value).subscribe({
        next: (data) => {
          this.toaster.success('Account created !');
    this.wantToSignUp = false;
        },
        error: (error) => {
          this.toaster.error('Error while trying to sign up, ' + error.error.message);
        }
      });
    } else {
      this.toaster.error('Please enter a valid email, password and pseudo');
    }
  }

}

