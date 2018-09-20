import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Account } from '../../interfaces/account';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute } from '@angular/router';
import { DialogActiveComponent } from '../dialogs/dialogs.component';
import { AccountService } from '../../providers/services';
import { AddAccountComponent } from '../add-account/add-account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  displayedColumns: string[] = ['noCuenta', 'type', 'alias', 'currency' ,'balance', 'status', 'options'];
  dataSource = new MatTableDataSource();
  accounts:Account[] = [];
  customerAccounts: Account[] = [];
  customerId:number = 0;
  accountId: number = 0;


  constructor(private home: HomeComponent, private router: ActivatedRoute, 
              public dialog: MatDialog, private _as: AccountService) { 
    this.home.title = 'Cuentas';
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    if (JSON.parse(localStorage.getItem('AccountsCustomer')) != null) {
      this.customerId = JSON.parse(localStorage.getItem('AccountsCustomer'));
    }
    if (JSON.parse(localStorage.getItem('accounts')) != null) {
     this.accounts = JSON.parse(localStorage.getItem('accounts'));
     this.getAccountsCustomer();
    }
    if (JSON.parse(localStorage.getItem('accountId')) != null) {
      this.accountId = JSON.parse(localStorage.getItem('accountId'));
    }
  }

  getAccountsCustomer(){
      this.customerAccounts = [];
      this.dataSource = new MatTableDataSource([]);
      for(let account of this.accounts){
        if (account.customerId == this.customerId) {
          this.customerAccounts.push(account);
        }
      }

      if (this.customerAccounts.length > 0) {
        this.dataSource = new MatTableDataSource(this.customerAccounts);
      }
  }

  status(status: string, account: Account){
    let title:string = '';
    let message:string = '';
    let active: boolean = false;
    if (status.toLocaleLowerCase() == 'activa') {
      title = 'Desactivar cuenta'
      message = '¿Esta seguro de desactivar la cuenta?'
      active = true;
    }else if (status.toLocaleLowerCase() == 'desactiva') {
      title = 'Activar cuenta'
      message = '¿Esta seguro de volver activar la cuenta?'
      active = false;
    }
    
    let dialogRef = this.dialog.open(DialogActiveComponent,{
      data:{ title: title, message: message, active: active }
    }); 
    
    dialogRef.afterClosed().subscribe(response =>{
        if (response) {
          this.changeStatus(account, status);
        }
    })
  }

  changeStatus(account:Account, status:string){
    if (status.toLowerCase() == 'activa') {
      account.status = 'Desactiva';
    }else if (status.toLowerCase() == 'desactiva' ) {
      account.status = 'Activa'
    }
    this._as.patchAccount(account);
  }

  addAccount(){
    let dialogRef = this.dialog.open(AddAccountComponent,{
      data: { title: 'Agregar Cuenta' }
    })

    dialogRef.afterClosed().subscribe(response => {
      if (response!= null) {
        let account:Account = response;
        account.customerId = this.customerId;
        account.id = this.accountId+1
        this._as.addAccount(account);
        localStorage.setItem('accountId', JSON.stringify(this.accountId+1));
        this.getData();
        this.getAccountsCustomer();
      }
    })
  }
}
