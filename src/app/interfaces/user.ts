import { Role } from "../enums/role.enum";

export class User {
    id: number;
    username: string;
    password: string;
    role: Role;

    constructor() {
        this.id = 0;
        this.username='';
        this.password='';
        this.role= Role.USER;
    }

}
