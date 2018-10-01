import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Customer } from '../../interfaces/customer';
import { SearchService } from '../../providers/services';
import { Account } from '../../interfaces/account';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  displayedColumns: string[] = ['noCuenta', 'type', 'alias', 'currency'
    , 'balance', 'status', 'options'];
  dataSource = new MatTableDataSource();
  noAccount: number;
  identification: number;
  searching: boolean = false;
  customer: Customer = new Customer();
  accounts: Account[] = [];

  constructor(private home: HomeComponent, private _ss: SearchService,
    public dialog: MatDialog) {
    this.home.title = 'Buscar Cliente'
  }

  ngOnInit() {
  }

  search() {
    if (this.noAccount != null && this.identification == null) {
      if (this._ss.getAccount(this.noAccount) != null) {
        let account = this._ss.getAccount(this.noAccount);
        this.customer = this._ss.getCustomerId(account.customerId);
        this.accounts.push(account);
      } else {
        this.dialog.open(DialogsComponent, {
          data: { message: 'Numero de cuenta no encontrado', title: 'Error' }
        })
      }

      if (this.accounts.length > 0) {
        this.searching = true;
        this.dataSource = new MatTableDataSource(this.accounts);
      }
    } else if (this.identification != null) {
      this.customer = this._ss.getCustomer(this.identification);
      if (this.customer == null) {
        this.dialog.open(DialogsComponent, {
          data: {
            title: 'Error de Identificacion',
            message: 'No se encontro a un cliente con esa identificación'
          }
        })
      }
      this.accounts = this._ss.getAccounts(this.customer.id);
      if (this.accounts.length > 0) {
        this.searching = true;
        this.dataSource = new MatTableDataSource(this.accounts);
      }
    } else {
      this.dialog.open(DialogsComponent, {
        data: {
          title: 'Error al realizar busqueda',
          message: 'Es requerido ingresar un parametro de busqueda'
        }
      });
    }
  }

  clear() {
    this.noAccount = null;
    this.identification = null;
    this.accounts = [];
    this.dataSource = new MatTableDataSource([]);
    this.searching = false;
  }

  saveAccount(id: number){
    localStorage.setItem('opAccount',JSON.stringify(id));
  }
}
