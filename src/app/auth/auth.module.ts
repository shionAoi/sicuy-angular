import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {authRoutes} from './auth.routing';
import { SignupComponent } from './signup/signup.component';


@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(authRoutes),
        ReactiveFormsModule
    ],
    exports: [],
})
export class AuthModule {
}
