import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  customers:Customer[] = [];
  accounts:Account[] = [];

  constructor() { 
    if (JSON.parse(localStorage.getItem('accounts')) != null) {
      this.accounts = JSON.parse(localStorage.getItem('accounts'));
    }
    if (JSON.parse(localStorage.getItem('customers')) != null) {
      this.customers = JSON.parse(localStorage.getItem('customers'));
    }
  }

  getCustomer(identification:number){
    for(let customer of this.customers){
      if (customer.identification === identification) {
        return customer;
      }
    }
  }

  getAccounts(customerId : number){
    let customerAccounts: Account[] = [];
    for(let account of this.accounts){
      if (account.customerId == customerId) {
        customerAccounts.push(account);
      }
    }

    return customerAccounts;
  }
}
