export class Customer {
    id: number;
    name: string;
    identification: number;
    birthdate: Date;
    address: string;
    phone: number;
    constructor() {
        this.id = 0;
        this.name =  '';
        this.identification = null;
        this.birthdate = null;   
        this.address = '';
        this.phone = null; 
    }
}
