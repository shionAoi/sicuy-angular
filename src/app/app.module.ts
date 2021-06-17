import {NgModule} from '@angular/core';
import {ToastrModule} from 'ngx-toastr';

import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';

import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {PageNotFoundComponent} from './page-errors/page-not-found/page-not-found.component';
import {PagesModule} from './pages/pages.module';
import {AuthModule} from './auth/auth.module';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPermissionsModule} from 'ngx-permissions';


@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        SidebarModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        ToastrModule.forRoot(),
        GraphQLModule,
        HttpClientModule,
        NgxPermissionsModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
