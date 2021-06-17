import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Access, User } from 'api/graphql';
import { UserService } from 'app/pages/user/user.service';

@Component({
  selector: 'app-update-access',
  templateUrl: './update-access.component.html',
  styles: [
  ]
})
export class UpdateAccessComponent implements OnInit {
  @Input() user: User;
  @Output() result = new EventEmitter<boolean>();
  access : Access;

  constructor(private modal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
    this.access = this.user.accessLifeCycle;
  }

  cambiarActivo(activo: boolean){
    this.access.active = activo;
  }

  cambiarInactivo(inactivo: boolean){
    this.access.inactive = inactivo;
  }

  updateAccess(){
    this.userService.updateAccess(this.user._id, this.access).subscribe(
      ({data}) => {
        let resultado = JSON.parse(JSON.stringify(data)).updateAccessOfUser;
        //console.log(JSON.parse(JSON.stringify(data)).updateAccessOfUser);
        this.result.emit(resultado);
        this.close();
      },
      (error) => {
        console.log(error)
      }
    )
  }

  close(): void {
    this.modal.close('');
  }

  dismiss(): void {
    this.modal.dismiss();
  }

}
