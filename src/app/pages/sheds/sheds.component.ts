import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserStore} from '../../services/user.store';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../../api/graphql';

@Component({
    selector: 'app-sheds',
    templateUrl: './sheds.component.html',
    styleUrls: ['./sheds.component.css']
})
export class ShedsComponent implements OnInit, OnDestroy {

    subject = new Subject<void>()
    user: User

    constructor(private userStore: UserStore) {
    }

    ngOnInit(): void {
        this.userStore.user$
            .pipe(takeUntil(this.subject))
            .subscribe(
                (user) => {
                    this.user = user;
                }
            )
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }
}
