import { Injectable } from '@angular/core';
import { User } from '../components/classes/user.class';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users: User[] = [];

    constructor() {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const userData = JSON.parse(storedUsers);
            userData.forEach((userData: any) => {
                this.users.push(new User(userData)) 
            })
        }
    }

    public getAllUsers(): User[] {
        return this.users;
    }

    public addUser(user: User) {
        user.id = this.generateId();
        this.users.push(user);
        this.saveUsersToLocalStorage();
    }

    public updateUser(user: User) {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
            this.saveUsersToLocalStorage();
        }
    }

    public deleteUser(id: number) {
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

    public getUserById(userId: number): User {
        const user = this.users.find((user) => user.id === userId);
        return user;
    }

}
