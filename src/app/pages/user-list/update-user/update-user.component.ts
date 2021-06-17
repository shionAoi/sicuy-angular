import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Access} from '../../user/models/access';
import { User} from '../../user/models/user';
import { UserService } from 'app/pages/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  @Input() user: User;

  constructor(private modal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
  }

  close(): void {
    this.modal.close('');
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  updateUser(user: User){
    this.userService.updateUser(user).subscribe(
      ({data}) => {
        this.user = JSON.parse(JSON.stringify(data)).updateUser;
        this.close();
      }, (error) => {
        console.log(error);
      }
    );
  }

}
