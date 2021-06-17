import { Component, OnInit } from '@angular/core';
import { Operation } from 'api/graphql';
import { UserService } from '../user.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styles: [
  ]
})
export class OperationsComponent implements OnInit {
  public headers : string[] = ['Nombre', 'Descripción', 'Tipo','Opciones'];
  public operaciones : Operation[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.operations().subscribe((response) => {
      this.operaciones = response.data['operations'];
    })
  }

}
