import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor() { 
    
  }

  getAccount(){
    let id = JSON.parse(localStorage.getItem('opAccount'));
    let accounts:Account[] = JSON.parse(localStorage.getItem('accounts'));
    for(let account of accounts){
      if (account.id == id) {
        return account;
      }
    }
  }

  getCustomer(id:number):Customer{
    let customers:Customer[] = JSON.parse(localStorage.getItem('customers'));
    for(let customer of customers){
      if (customer.id == id) {
        return customer;        
      }
    }


  }
}
