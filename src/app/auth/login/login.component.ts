import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    loginF = new FormGroup({
        email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
        password: new FormControl({ value: '', disabled: false }, [Validators.required])
    });
    submitted = false;
    loading = false;
    error = null;

    constructor(private authService: AuthenticationService,
        private router: Router) {
    }

    ngOnInit(): void {
    }

    get f() { return this.loginF.controls; }

    login(): void {
        this.submitted = true;
        if (this.loginF.invalid) {
            return;
        }
        this.loading = true;
        this.error = null;
        this.authService.login(this.loginF.get('email').value, this.loginF.get('password').value)
            .subscribe(
                value => {
                    this.loading = false
                    this.router.navigate(['/dashboard'])
                },
                error => {
                    this.loading = false
                    this.error = 'error'
                    console.log('error', error)
                },
                () => {
                    this.loading = false
                    this.error = null
                }
            )
    }
}
