import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { MatTableDataSource } from '@angular/material';
import { Customer } from '../../interfaces/customer';
import { SearchService } from '../../providers/services';
import { Account } from '../../interfaces/account';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {
  
  displayedColumns: string[] = ['identification', 'name', 'birthday', 'address' ,'phone' ,'options'];
  dataSource = new MatTableDataSource();
  noAccount:number;
  identification:number;
  searching: boolean = false;
  customer:Customer = new Customer();
  accounts: Account[]= [];

  constructor(private home: HomeComponent, private _ss: SearchService) {
    this.home.title = 'Buscar Cliente'
  }

  ngOnInit() {
  }

  search(){
    if (this.noAccount != null) {
      
    }else if (this.identification != null){
      this.customer = this._ss.getCustomer(this.identification);
      if (this.customer == null) {
        
      }
      this.accounts = this._ss.getAccounts(this.customer.id);
    }
  }
}
