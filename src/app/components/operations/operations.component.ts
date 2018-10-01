import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { OperationService } from '../../providers/services';
import { Account } from '../../interfaces/account';
import { Customer } from '../../interfaces/customer';
import { MatDialog } from '@angular/material';
import { CashComponent, CheckDialogComponent } from '../dialogs/dialogs.component';
import { Banks } from '../../enums/banks.enum';
import { Detail } from '../../interfaces/detail';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  account:Account = new Account();
  customer: Customer = new Customer();
  operation: string = 'deposit';
  banks: string[] = Object.values(Banks);
  totalCheckOwn: number;
  totalCheckOther: number;
  detail: Detail = new Detail();
  

  constructor(private home: HomeComponent, private _os: OperationService,
              public dialog: MatDialog) {
    this.home.title = 'Operaciones';
    this.account = this._os.getAccount();
    this.customer = this._os.getCustomer(this.account.customerId);
  }

  ngOnInit() {
  }

  cash(){
    let dialogRef = this.dialog.open(CashComponent,{
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(response =>{
      console.log(response);
      
    })
  }

  check(text:any){
    let title;
    let check;
    if(text == 'own'){
      title = 'Cheques Propios';
      check = 'own';
    }else if(text == 'other'){
      title = 'Cheques de Otros Bancos';
      check = 'other';
    }
    let dialogRef = this.dialog.open(CheckDialogComponent,{
      width: '400px',
      data: {title: title, check: check}
    });


    dialogRef.afterClosed().subscribe(response => {
      if (text == 'own') {
        this.detail.ownCheck = response.ownCheck;
        console.log(this.detail);  
      }
    })
  }
}
