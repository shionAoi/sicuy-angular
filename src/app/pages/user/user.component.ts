import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { UserService } from './user.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    userInfo: User = new User();

    constructor(private userService: UserService, private router: Router){

    }
    ngOnInit() {
        this.userService.getUserInfo().subscribe(
            ({data}) => {
                this.userInfo = JSON.parse(JSON.stringify(data)).userInfo;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    actualizarPerfil(user: User){
        this.userService.updateUser(user).subscribe(
            ({data}) => {
                this.userInfo = JSON.parse(JSON.stringify(data)).updateUser;
            },
            (error) => {
                console.log(error);
            }
        )
    }

    usersList(){
        this.router.navigate(['user-list']);
    }

    roles(){
        this.router.navigate(['rols']);
    }

    operations(){
        this.router.navigate(['operations']);
    }
}
