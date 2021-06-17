import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'api/graphql';

@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styles: [
  ]
})
export class AddRolComponent implements OnInit {
  @Input() titulo: string;
  @Input() rol: Role;
  @Output() result = new EventEmitter<Role>();

  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {

  }
  
  saveRol(datos: Role){
    this.result.emit(datos);
    this.close();
  }

  close(): void {
    this.modal.close('');
  }

  dismiss(): void {
    this.modal.dismiss();
  }


}
