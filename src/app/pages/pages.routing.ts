import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {BirthRateComponent} from './birth-rate/birth-rate.component';
import {DeathRateComponent} from './death-rate/death-rate.component';
import {ShedsComponent} from './sheds/sheds.component';
import {ShedsGridComponent} from './sheds/sheds-grid/sheds-grid.component';
import {PoolsListComponent} from './sheds/pools-list/pools-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {CuyListComponent} from './sheds/cuy-list/cuy-list.component';
import {RolsComponent} from './user/rols/rols.component';
import {OperationsComponent} from './user/operations/operations.component';
import {PullOutRateComponent} from './pull-out-rate/pull-out-rate.component';

export const pagesRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'user-list',
        component: UserListComponent
    },
    {
        path: 'rols',
        component: RolsComponent
    },
    {
        path: 'operations',
        component: OperationsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'birth-rate',
        component: BirthRateComponent
    },
    {
        path: 'death-rate',
        component: DeathRateComponent
    },
    {
        path: 'pulls-out-rate',
        component: PullOutRateComponent
    },
    {
        path: 'sheds',
        component: ShedsComponent,
        children: [
            {
                path: '',
                component: ShedsGridComponent,
            },
            {
                path: ':id',
                component: PoolsListComponent,
            },
            {
                path: ':id/pool/:id',
                component: CuyListComponent
            }
        ]
    }
];
