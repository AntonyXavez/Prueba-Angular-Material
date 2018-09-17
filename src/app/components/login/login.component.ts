import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { LoginService } from '../../providers/services';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogsComponent } from '../dialogs/dialogs.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private _ls: LoginService, private home: HomeComponent,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  login() {
    let object: any[2] = this._ls.login(this.user);
    console.log(object);
    
    if (object.length != 0) {
      this.home.sesion = object[0];
      this.home.role = object[1];
      this.router.navigate(['/search-customer'])
    }else{
      this.openDialog('Usuario o contraseña invalida', 'Error al iniciar');
    }
  }


  openDialog(message, title): void {
    const dialogRef = this.dialog.open(DialogsComponent, {
      data: { message: message, title: title }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

