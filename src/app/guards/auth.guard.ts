import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {UserStore} from '../services/user.store';
import {Observable} from 'rxjs';
import {SessionService} from '../services/session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private userStore: UserStore,
        private userService: UserService,
        private sessionService: SessionService,
        private router: Router
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.sessionService.isLogged()) {
            this.router.navigate(['/auth/login'])
            return false
        }
        if (this.userStore.userNull()) {
            const {userId} = this.sessionService.getTokenDecoded();
            return this.userService.getUserById(userId).toPromise().then(
                (user) => {
                    this.userStore.setUser(user);
                    return true
                }
            ).catch((err) => {
                this.sessionService.removeToken();
                this.userStore.setUser(null);
                this.router.navigate(['/auth/login']);
                return false
            })
        } else {
            return true
        }
    }

}
