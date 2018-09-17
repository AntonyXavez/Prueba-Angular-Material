import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Customer } from '../../interfaces/customer';
import { AddAccountComponent } from '../add-account/add-account.component';
import { Account } from '../../interfaces/account';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { CustomerService, AccountService } from '../../providers/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['identification', 'name', 'birthday', 'address' ,'phone' ,'options'];
  accountColumns: string[] = ['number', 'alias', 'type', 'currency', 'balance', 'options'];
  dataSource = new MatTableDataSource();
  accountSource = new MatTableDataSource();
  accounts: Account[] = [];

  add: boolean = false;
  hide = true;
  error: boolean = false;
  passwordError: boolean = false;
  accountId: number = 0;
  customerId: number = 0;

  message: string = '';
  passwordConfirm: string = '';
  startDate = new Date(1996, 0, 1);

  customer: Customer = new Customer();
  

  constructor(private home: HomeComponent, public dialog: MatDialog,
    private _cs: CustomerService, private _as: AccountService, private router: Router) {
    this.home.title = 'Clientes'
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    if (JSON.parse(localStorage.getItem('customers')) != null) {
      this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('customers')));
    }
    if (JSON.parse(localStorage.getItem('accountId')) != null) {
      this.accountId = JSON.parse(localStorage.getItem('accountId'));
    }
    if (JSON.parse(localStorage.getItem('customerId')) != null) {
      this.customerId = JSON.parse(localStorage.getItem('customerId'));
    }
  }

  addCustomer() {
    if (this.customer.identification == null || this.customer.address == null || this.customer.birthdate == null
      || this.customer.name == null || this.customer.phone == null) {
      this.dialog.open(DialogsComponent, {
        data: { title: 'Error', message: 'Aun faltan campos requeridos' }
      });
    } else {
      this.customer.id = (this.customerId + 1);    
      this.openDialog();
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddAccountComponent, {
      data: { title: 'Agregar Cuenta' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        let account: Account = result;
        account.id = this.accountId + 1;
        account.customerId = this.customer.id;
        localStorage.setItem('accountId', JSON.stringify((this.accountId+1)));
        this._as.addAccount(account);
        this._cs.addCustomer(this.customer);
        localStorage.setItem('customerId', JSON.stringify((this.customerId+1)));
        this.add = false;
        this.getData();
       } else {
        this.dialog.open(DialogsComponent, {
          data: { title: 'Error', message: 'Es necesario agregar una cuenta' }
        })
      }
    });
  }

  addCancel(){
    this.customer = new Customer();
    this.add = false;
  }

  navigate(id: number){
    localStorage.setItem('AccountsCustomer', JSON.stringify(id));
    this.router.navigate(['/customer/'+id+'/accounts']);
  }


}
