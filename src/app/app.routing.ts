import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthGuard} from './guards/auth.guard';
import {PageNotFoundComponent} from './page-errors/page-not-found/page-not-found.component';
import {LoginGuard} from './guards/login.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: AdminLayoutComponent,
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'auth',
        canActivate: [LoginGuard],
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]
