import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  getAllUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {
    user.id = this.generateId();
    this.users.push(user);
    this.saveUsersToLocalStorage();
  }

  updateUser(user: User) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.saveUsersToLocalStorage();
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    this.saveUsersToLocalStorage();
  }

  private generateId(): number {
    const ids = this.users.map((user) => user.id);
    return Math.max(0, ...ids) + 1;
  }

  private saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUserById(userId: number): User | null {
    console.log('getUserById called with userId:', userId);
    
    const user = this.users.find((user) => user.id === userId);
  
    return user || null;
  }
  
}

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public infix: string,
    public lastName: string,
    public postalCode: string,
    public houseNumber: number,
    public addition: string,
    public city: string,
    public streetName: string

  ) { }
}