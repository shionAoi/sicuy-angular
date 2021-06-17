import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthData, User, UserInput } from '../../api/graphql';
import { SessionService } from './session.service';
import { LoginMutation } from './graphql/login.mutation';
import { SignUpMutation } from './graphql/signup.mutation';
import { UserStore } from './user.store';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private loginQuery: LoginMutation,
        private signUpMutation: SignUpMutation,
        private sessionService: SessionService,
        private userStore: UserStore) {
    }

    login(email: string, password: string): Observable<AuthData> {
        return this.loginQuery.mutate({ email: email, password: password })
            .pipe(
                map((res) => res.data.login),
                tap((authData) => {
                    this.sessionService.setToken(authData.token, authData.tokenExpiration, authData.token_refresh)
                    this.userStore.setUser(authData.user)
                })
            )
    }

    signUp(user: UserInput): Observable<User> {
        return this.signUpMutation.mutate({ user }).pipe(
            map((res) => res.data.signup)
        )
    }

    logout(): void {
        this.sessionService.removeToken();
        this.userStore.setUser(null);
    }
}

