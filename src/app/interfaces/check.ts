import { Banks } from "../enums/banks.enum";

export class Check {
    id: number;
    noCheck: number;
    bank:Banks;
    total: number;

    constructor(){
        this.id = null;
        this.noCheck = null;
        this.bank = Banks.GYT;
        this.total = null; 
    }
}
    