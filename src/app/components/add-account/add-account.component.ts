import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Alias } from '../../enums/alias.enum';
import { Currency } from '../../enums/currency.enum';
import { AccountType } from '../../enums/account-type.enum';
import { Account } from '../../interfaces/account';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {

  alias: string[] = Object.values(Alias);
  currencies: string[] = Object.values(Currency);
  type: string[] = Object.values(AccountType);
  account: Account = new Account();

  accounts: Account[] = [];

  event: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<AddAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addAccount() {
    this.account.number = Math.floor(Math.random() * Math.floor(99999));
    
    if (this.account.alias.toString() == Alias.STANDAR.toString()) {
      this.account.alias = Alias.STANDAR
    }else if (this.account.alias.toString() == Alias.STANDAR.toString()) {
      this.account.alias = Alias.JUVENIL
    }

    if (this.account.currency === 'Quetzal') {
      this.account.currency = Currency.QUETZAL;
    }else if (this.account.currency == 'Dolar') {
      this.account.currency = Currency.DOLAR;
    }else if (this.account.currency == 'Euro') {
      this.account.currency = Currency.EURO;
    }

    if (this.account.type == 'Ahorro') {
      this.account.type = AccountType.AHORRO;
    }else if (this.account.type == 'Ahorro') {
      this.account.type = AccountType.AHORRO;
    }

    this.dialogRef.close(this.account);
  }



}
