import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor (
    public authService : AuthService,
    public router : Router
  ) {}

  hide = true
  isIncorrectLogin = false
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required ,Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/)])
  })

  onSubmit() {
    this.authService.SignIn(this.loginForm.value.email!, this.loginForm.value.password!)
    .catch(err => {
      console.log(err.mesage);
      this.isIncorrectLogin = true;
    });
  }

}
