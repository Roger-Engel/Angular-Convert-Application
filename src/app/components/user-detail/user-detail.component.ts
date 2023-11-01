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
  public faPencil = faPencil;
  public faTrash = faTrash;
  public user: User | null = null;

  public users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = Number(params.get('id'));
      this.user = this.userService.getUserById(userId);
    });
  }

  public deleteUser(id: number): void {
    const confirmed = window.confirm('Weet je zeker dat je deze gebruiker wilt verwijderen?');
    if (confirmed) {
      this.userService.deleteUser(id);
      this.users = this.userService.getAllUsers();
    }
  }
}