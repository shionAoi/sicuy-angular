import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'api/graphql';
import { UserService } from 'app/pages/user/user.service';


@Component({
  selector: 'app-assign-rol',
  templateUrl: './assign-rol.component.html',
  styles: [
  ]
})
export class AssignRolComponent implements OnInit {
  @Input() userRol: Role;
  roles: Role[] = [];
  @Output() result = new EventEmitter<string>();
  seleccionado : string;

  constructor(private modal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
    if(this.userRol) {
      this.seleccionado = this.userRol._id;
    } else {
      this.seleccionado = 'undefined';
    }
    this.userService.roles().subscribe((response) => {
      this.roles = response.data['roles'];
    });
  }

  close(): void {
    this.modal.close('');
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  assignRol(){
    this.result.emit(this.seleccionado);
    this.close();
  }

}
