import { Check } from "./check";

export class Detail {
    bills100:number;
    bills50: number;
    bills20: number;
    bills10: number;
    bills5: number;
    coins: number;
    ownCheck: Check[];
    otherCheck: Check[];

    constructor(){
     this.bills100 = null;
     this.bills50 = null;
     this.bills20 = null;
     this.bills10 = null;
     this.bills5 = null;
     this.coins = null;
     this.ownCheck = [];
     this.otherCheck = [];
    }
}
