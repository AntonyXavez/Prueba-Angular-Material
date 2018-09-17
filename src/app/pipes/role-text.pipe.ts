import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'role'})
export class RoleTextPipe implements PipeTransform {
    transform(value: any): any {
        if (value == 0) {
            return 'ADMIN'
        }else{
            return 'USER'
        }
        
    }
}