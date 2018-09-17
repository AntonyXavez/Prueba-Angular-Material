import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  userId: number = 1;

  constructor() {
    if(JSON.parse(localStorage.getItem('users')) != null){
      this.users =  JSON.parse(localStorage.getItem('users'));
    }
    if (JSON.parse(localStorage.getItem('userId'))!= null) {
      this.userId = JSON.parse(localStorage.getItem('userId'));
    }
   }


  addUser( user:User ){
    user.id = this.userId+1;
    console.log(user);
    this.users.push(user);
    localStorage.setItem('userId', JSON.stringify(this.userId+1));
    localStorage.setItem('users', JSON.stringify(this.users));
  } 

  remove( user:any ){
    for (let i = 0; i < this.users.length; i++) {
      let element = this.users[i];
      if (element.id == user.id) {
        this.users.splice(i, 1);
      }
    }
    localStorage.setItem('users', JSON.stringify(this.users));
    return this.users;
  }

}
