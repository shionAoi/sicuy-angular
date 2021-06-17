import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInput } from 'api/graphql';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    names: new FormControl('', [Validators.required, Validators.minLength(2)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dni: new FormControl('', [Validators.minLength(8), Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(25)]),
  });
  loading = false;
  submitted = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get f() { return this.signUpForm.controls; }

  signUp(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.loading = true;
    let userInput: UserInput = {
      names: this.signUpForm.get('names').value,
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
      phone: this.signUpForm.get('phone').value,
    }
    if (this.signUpForm.get('dni').value) {
      userInput.dni = this.signUpForm.get('dni').value;
    }
    this.authService.signUp(userInput)
        .subscribe(
          data =>{
            this.loading = false;
            this.router.navigate(['auth','login'])
          },
          error =>{
            this.loading = false;
            console.log(error);
            
          }
        )
  }

}
