import {Component, OnInit} from '@angular/core';
import {User} from '../../api/graphql';
import {UserStore} from '../services/user.store';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export interface MenuItem {
    title?: string,
    class?: string,
    icon?: string,
    submenuItems?: MenuItem[],
    path?: string,
}

export const ROUTES: RouteInfo[] = [
    {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    {path: '/sheds', title: 'Galpones', icon: 'home', class: ''},
    {path: '/birth-rate', title: 'Natalidad', icon: 'trip_origin', class: ''},
    {path: '/death-rate', title: 'Mortalidad', icon: 'trip_origin', class: ''},
    { path: '/pulls-out-rate', title: 'Sacas', icon: 'trip_origin', class: ''},
    {path: '/user', title: 'Perfil de Usuario', icon: 'person', class: ''},
    // { path: '/icons', title: 'Icons', icon: 'trip_origin', class: '' },
    // { path: '/maps', title: 'Maps', icon: 'fmd_good', class: '' },
    // { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
    // { path: '/table', title: 'Table List', icon: 'table_chart', class: '' },
    // { path: '/typography', title: 'Typography', icon: 'font_download', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menu = {
        dashboard: {path: '/dashboard', title: 'Dashboard', icon: 'home', class: ''},
        sheds: {path: '/sheds', title: 'Galpones', icon: 'home', class: ''},
        birth_rate: {path: '/birth-rate', title: 'Natalidad', icon: 'trip_origin', class: ''},
        death_rate: {path: '/death-rate', title: 'Mortalidad', icon: 'trip_origin', class: ''},
        pulls_out_rate: {path: '/pulls-out-rate', title: 'Sacas', icon: 'shortcut', class: ''},
        user: {path: '/user', title: 'Perfil de Usuario', icon: 'person', class: ''},
    };

    notVisible = '5ff63b8a954cfe092a306368';
    manageUser = false;
    user: User;
    avatar: string;

    constructor(private userStore: UserStore) {
        this.userStore.user$
            .subscribe((user) => {
                this.user = user;
            })
        this.avatar = 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true&name=' + this.user.names.slice(0, 1);
        this.user.roles.forEach((rol) => {
            if (rol._id === this.notVisible) {
                this.manageUser = true
            }
        })
    }

    ngOnInit() {
    }
}
