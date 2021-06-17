import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'api/graphql';
import { Rol } from '../models/rol';
import { UserService } from '../user.service';
import { AddRolComponent } from './add-rol/add-rol.component';

@Component({
  selector: 'app-rols',
  templateUrl: './rols.component.html',
  styles: [
  ]
})
export class RolsComponent implements OnInit {
  public headers : string[] = ['Nombre', 'Descripción', 'Opciones'];
  public roles : Role[] = [];

  constructor(private userService: UserService, private modal: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getRoles();
  }

  addRol(){
    const addRolModal: NgbModalRef = this.modal.open(AddRolComponent, {size: 'md'});
    addRolModal.componentInstance.rol = new Rol();
    addRolModal.componentInstance.titulo = "Agregar Nuevo Rol";
    addRolModal.componentInstance.result.subscribe((resultado) => {
      if(resultado) {
        console.log(resultado);
        this.userService.addRol(resultado).subscribe((response) => {
          window.location.reload();
          //console.log(response.data['addRole']);
        });
      }
    });

  }

  editRole(pRol: Role){
    const editRolModal : NgbModalRef = this.modal.open(AddRolComponent, {size: 'md'});
    editRolModal.componentInstance.rol = pRol;
    editRolModal.componentInstance.titulo = "Editar Rol del Sistema";
    editRolModal.componentInstance.result.subscribe( (resultado) => {
      if(resultado) {
        this.userService.updateRol(resultado).subscribe((response) => {
          window.location.reload();
        })
      }
    });
  }

  deleteRol(id: string){
    this.userService.deleteRol(id).subscribe( (response) => {
      console.log(response);
      alert('El Rol ha sido eliminado');
      window.location.reload();
    });
  }

  watchOperations(pRol: Role){
    
  }

  getRoles(){
    this.userService.roles().subscribe((response) => {
      this.roles = response.data['roles'];
    })
  }

}
