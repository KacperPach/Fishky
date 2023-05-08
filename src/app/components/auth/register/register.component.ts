import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor (
    public auth: AuthService
  ){}

  checkPassword: ValidatorFn = (fGroup: AbstractControl): ValidationErrors | null => {
    const pass = fGroup.get('password')?.value;
    const repPass = fGroup.get('passwordRepeat')?.value;

    return pass === repPass? null : { notSame: true }
  }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required ,Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/)]),
    passwordRepeat: new FormControl('', [Validators.required])
  }, {validators: this.checkPassword})

  onSubmit() {
    this.auth.SignUp(this.registerForm.value.email!, this.registerForm.value.password!);
  }
}
