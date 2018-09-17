import { AccountType } from '../enums/account-type.enum'
import { Currency } from '../enums/currency.enum'
import { Alias } from '../enums/alias.enum';

export class Account {
    id: number;
    number: number;
    balance: number;
    alias: Alias;
    currency: Currency;
    type: AccountType;
    customerId: number;
    status: string;
    constructor(){ 
        this.id = 0;
        this.number = null;
        this.balance= 0;
        this.alias= null;
        this.currency= null;
        this.type = null;
        this.customerId = 0;
        this.status = 'Activa'
    }
}
