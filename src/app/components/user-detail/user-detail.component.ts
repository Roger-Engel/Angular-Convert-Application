import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from 'src/app/services/user.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;
  user: User | null = null;

  users: User[] = [];


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = Number(params.get('id'));
      this.user = this.userService.getUserById(userId);
    });
  }

  deleteUser(id: number): void {
    const confirmed = window.confirm('Weet je zeker dat je deze gebruiker wilt verwijderen?');
    if (confirmed) {
      this.userService.deleteUser(id);
      this.users = this.userService.getAllUsers();
    }
  }

}

