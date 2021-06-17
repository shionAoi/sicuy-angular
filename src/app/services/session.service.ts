import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of, Subscription } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    helper = new JwtHelperService();
    private timer: Subscription;

    constructor(
        private http: HttpClient
    ) {
    }

    isLogged(): boolean {
        try {
            return !this.helper.isTokenExpired(this.getToken())
        } catch (e) {
            return false
        }
    }

    getTokenDecoded(): any {
        try {
            return this.helper.decodeToken(this.getToken())
        } catch (e) {
            return null
        }
    }

    getToken(): string {
        return localStorage.getItem('token') || ''
    }

    private getTokenRefresh(): string {
        return localStorage.getItem('token_refresh') || ''
    }

    setToken(token: string, tokenExpiration: string, tokenRefresh: string): void {
        localStorage.setItem('token', token);
        localStorage.setItem('token_refresh', tokenRefresh);
        localStorage.setItem('expires_at', tokenExpiration);
        this.startTokenTimer();
    }

    refreshToken() {
        const refresh = localStorage.getItem('token');
        if (!refresh) {
            this.removeToken();
            return of(null)
        }
        const headers = { 'Authorization': `Bearer ${this.getTokenRefresh()}` }
        return this.http.get<any>(
            `${environment.API_ENDPOINT_ROOT}/token/refresh-token`,
            { headers }
        ).pipe(
            tap(
                data => {
                    this.setToken(data.token, data.tokenExpiration, data.token_refresh)
                }
            )
        )
    }

    removeToken(): void {
        const headers = { 'Authorization': `Bearer ${this.getToken()}` }
        this.http.post(
            `${environment.API_ENDPOINT_ROOT}/token/revoke-token`,
            {},
            { headers }
        ).subscribe();
        localStorage.clear();
        this.stopTokenTimer();
    }

    private getTokenRemainingTime() {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            return 0;
        }
        const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        return expires.getTime() - Date.now() - 10000;
    }

    private startTokenTimer() {
        const timeout = this.getTokenRemainingTime();
        this.timer = of(true)
            .pipe(
                delay(timeout),
                tap(() => this.refreshToken().subscribe())
            )
            .subscribe();
    }

    private stopTokenTimer() {
        this.timer?.unsubscribe();
    }
}
