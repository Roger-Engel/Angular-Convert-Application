import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService, User } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  @Input() user: User = {
    id: 0,
    firstName: '',
    infix: '',
    lastName: '',
    postalCode: '',
    houseNumber: 0,
    addition: '',
    city: '',
    streetName: ''
  }

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      const userId = Number(params.get('id'));
      if (userId) {
        this.user = this.userService.getUserById(userId);
      }
    });
  }

  onSubmit() {
    if (this.user.id === 0) {
      this.userService.addUser(this.user);
    } else {
      this.userService.updateUser(this.user);
    }
    this.user = { 
      id: 0, 
      firstName: '', 
      infix: '', 
      lastName: '', 
      postalCode: '', 
      houseNumber: 0, 
      addition: '', 
      city: '', 
      streetName: '' 
    };
    this.router.navigate(['/users']);
  }

  capitalizeFirstLetter(field: string) {
    if (this.user[field]) {
      this.user[field] = this.user[field].charAt(0).toUpperCase() + this.user[field].slice(1);
    }
  }

  navigateAndReload() {
    this.router.navigate(['/users']).then(() => {
      window.location.reload();
    });
  }
}
