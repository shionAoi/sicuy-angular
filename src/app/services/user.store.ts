import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../api/graphql';

@Injectable({
    providedIn: 'root'
})
export class UserStore {

    private subject = new BehaviorSubject<User>(null)

    private userObs: Observable<User> = this.subject.asObservable()

    constructor() {
    }

    get user$(): Observable<User> {
        return this.userObs
    }

    userNull(): boolean {
        return this.subject.value === null
    }

    set user(newUser: User) {
        this.subject.next(newUser)
    }

    setUser(newUser: User) {
        this.subject.next(newUser)
    }
}
