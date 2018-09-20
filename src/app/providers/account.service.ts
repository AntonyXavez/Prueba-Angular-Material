import { Injectable } from '@angular/core';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account: Account = new Account();
  accounts: Account[] = [];
  
  constructor() { 
    if (JSON.parse(localStorage.getItem('accounts')) != null) {
      this.accounts = JSON.parse(localStorage.getItem('accounts'));
    }
  }

  addAccount(account:Account){
    this.accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }

  getAccountsClient(customerId:number){
    let accountsCustomer: Account[] = [];
    for (let i = 0; i < this.accounts.length; i++) {
      const element = this.accounts[i];
      if (element.customerId == customerId) {
        accountsCustomer.push(element);
      }
    }

    return accountsCustomer;
  }

  patchAccount(account: Account){
    for (let i = 0; i < this.accounts.length; i++) {
      const element = this.accounts[i];
      if (element.id == account.id) {
        this.accounts.splice(i,1);
        break;
      }
    }
    this.accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(this.accounts));   
  }
}
