import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers: Customer[] = [];

  constructor() { 
    if (JSON.parse(localStorage.getItem('customers')) != null) {
      this.customers = JSON.parse(localStorage.getItem('customers'));
    }
  }

  addCustomer(customer: Customer){
    console.log(customer);
    
    this.customers.push(customer);
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

}
