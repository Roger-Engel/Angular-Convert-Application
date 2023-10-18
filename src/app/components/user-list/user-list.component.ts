import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { User} from '../../services/user.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  faPencil = faPencil;
  faTrash = faTrash;
  faPlus = faPlus;
  faInfoCircle = faInfoCircle;


  users : User[] = [];
 

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getAllUsers();
  }

  deleteUser(id: number): void {
    const confirmed = window.confirm('Weet je zeker dat je deze gebruiker wilt verwijderen?');
    if (confirmed) {
      this.userService.deleteUser(id);
      this.users = this.userService.getAllUsers();
    }
  }
}
