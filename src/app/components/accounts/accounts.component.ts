import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Account } from '../../interfaces/account';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  displayedColumns: string[] = ['noCuenta', 'type', 'alias', 'currency' ,'balance', 'status'];
  dataSource = new MatTableDataSource();
  accounts:Account[] = [];
  customerAccounts: Account[] = [];
  customerId:number = 0;


  constructor(private home: HomeComponent, private router: ActivatedRoute) { 
    this.home.title = 'Cuentas';
    if (JSON.parse(localStorage.getItem('AccountsCustomer')) != null) {
      this.customerId = JSON.parse(localStorage.getItem('AccountsCustomer'));
    }
    if (JSON.parse(localStorage.getItem('accounts')) != null) {
     this.accounts = JSON.parse(localStorage.getItem('accounts'));
     this.getAccountsCustomer();
    }
  }

  ngOnInit() {
  }

  getAccountsCustomer(){
      for(let account of this.accounts){
        if (account.customerId == this.customerId) {
          this.customerAccounts.push(account);
        }
      }

      if (this.customerAccounts.length > 0) {
        this.dataSource = new MatTableDataSource(this.customerAccounts);
      }
  }
}
