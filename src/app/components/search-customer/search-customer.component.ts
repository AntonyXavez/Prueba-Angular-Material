import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  constructor(private home: HomeComponent) {
    this.home.title = 'Buscar Cliente'
  }

  ngOnInit() {
  }

}
