import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/user.class';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  public user: User;

  @ViewChild('userForm', { static: false }) userForm: NgForm;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      const userId = Number(params.get('id'));
      if (userId) {
        this.user = this.userService.getUserById(userId);
      } else {
        this.user = new User({
          firstName: "",
          infix: "",
          lastName: "",
          postalCode: "",
          houseNumber: "",
          addition: "",
          city: "",
          streetName: ""
        })
      }
    });
  }

  public onSubmit() {
    const user = new User(this.user)
    if (!this.user.id) {
      this.userService.addUser(user);
    } else {
      this.userService.updateUser(user);
    }
    this.userForm.resetForm();
    this.navigateAndReload();
  }

  public capitalizeFirstLetter(field: string) {
    if (this.user[field]) {
      this.user[field] = this.user[field].charAt(0).toUpperCase() + this.user[field].slice(1);
    }
  }

  public navigateAndReload() {
    this.router.navigate(['/users']);
  }
}
