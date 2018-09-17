import { Currency } from "../enums/currency.enum";
import { TransactionType } from "../enums/transaction-type.enum";

export class Transaction {
    id: number;
    customerId: number;
    accountId: number;
    currency: Currency;
    type: TransactionType;
    constructor () {
        this.id = 0;
        this.customerId = null;
        this.accountId = null;
        this.currency = null;
        this.type = null;
    }
}
