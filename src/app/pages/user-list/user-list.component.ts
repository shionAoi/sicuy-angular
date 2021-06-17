import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateAccessComponent } from './update-access/update-access.component';
import { AssignRolComponent } from './assign-rol/assign-rol.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public headers : string[] = ['DNI', 'Nombres', 'Correo Electrónico', 'Teléfono', 'Rol', 'Opciones'];
  public users : User[] = [];

  constructor(private userService: UserService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.userService.users().subscribe(
      ({data}) => {
        this.users = JSON.parse(JSON.stringify(data)).users;
      }, (error) => {

      }
    );
  }

  editUser(id: string){
    let user : User;
    this.userService.getUserById(id).subscribe( 
      ({data}) => {
        user = JSON.parse(JSON.stringify(data)).userById;
        const updateUserModal: NgbModalRef = this.modal.open(UpdateUserComponent, { size: 'lg'});
        updateUserModal.componentInstance.user = user;
        updateUserModal.result
          .then(() => {
            this.userService.users().subscribe(
              ({data}) => {
                this.users = JSON.parse(JSON.stringify(data)).users;
              }, (error) => {
        
              }
            );
          })
          .catch(() => {

          })
      }, (error) => console.log(error)
    );
  }

  editAccess(id: string){
    let user : User;
    this.userService.getUserById(id).subscribe( 
      ({data}) => {
        user = JSON.parse(JSON.stringify(data)).userById;
        const updateAccessOfUser: NgbModalRef = this.modal.open(UpdateAccessComponent, { size: 'md'});
        updateAccessOfUser.componentInstance.user = user;
        updateAccessOfUser.componentInstance.result.subscribe((resultado) => {
          console.log(resultado);
          if(resultado) {
            this.userService.users().subscribe(
              ({data}) => {
                this.users = JSON.parse(JSON.stringify(data)).users;
                window.location.reload();
              }
            )
          }
        })
      }, (error) => console.log(error)
    );
  }

  deleteUser(id: string){
    this.userService.deleteUser(id).subscribe(
      ({data}) => {
        alert('El usuario ha sido eliminado');
        console.log(data);
      }, (error) => {

      }
    )
  }

  changeRole(user: User){
    const assignRolModal : NgbModalRef = this.modal.open(AssignRolComponent,{ size: 'md'});
    assignRolModal.componentInstance.userRol = user.roles[0];
    assignRolModal.componentInstance.result.subscribe((resultado) => {
      if((user.roles.length > 0 && resultado == user.roles[0]._id) || (resultado == 'undefined' && user.roles.length == 0)){
        alert('Rol es el mismo');
      } else if (resultado == 'undefined' && user.roles.length > 0){
        console.log('Delete');
        this.userService.deleteRoleToUser(user._id, user.roles[0]._id).subscribe((response) =>{
          console.log(response);
        });
      } else if(resultado != 'undefined' && user.roles.length == 0){
        this.userService.addRoleToUser(user._id, resultado).subscribe((response) => {
          console.log(response);
        });
      } else if(resultado != 'undefined' && user.roles.length > 0) {
        this.userService.deleteRoleToUser(user._id, user.roles[0]._id).subscribe((response) => {
          console.log(response);
          this.userService.addRoleToUser(user._id, resultado).subscribe((response)=> {
            console.log(response);
          })
        })
      }
      window.location.reload();
    });
  }

}
