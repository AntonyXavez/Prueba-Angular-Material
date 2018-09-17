import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  admin: User = {
    id: 1,
    password: 'admin',
    role: Role.ADMIN,
    username: 'admin'
  }

  users: User[] = [];

  constructor() {
    if(JSON.parse(localStorage.getItem('users')) != null){
      this.users = JSON.parse(localStorage.getItem('users'));
    }else{
      this.users.push(this.admin);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  login(user: User){    
    let object:any[2] = []
    
    for (let i = 0; i < this.users.length; i++) {
      
      let username = this.users[i].username;
      let password = this.users[i].password;
      let role = this.users[i].role;
      
      if (username.toLocaleLowerCase() == user.username.toLocaleLowerCase() 
          && password.toLocaleLowerCase() == user.password.toLocaleLowerCase()) {
        object[0] = true;
        object[1] = role;
        localStorage.setItem('sesion',JSON.stringify(true));
        localStorage.setItem('role',JSON.stringify(role));
      }
    }
    return object;
  }
}
