import { Component, OnInit, Inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { User } from '../../interfaces/user';
import { UserService } from '../../providers/services';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['username', 'password', 'role','options'];
  dataSource = new MatTableDataSource();

  add: boolean = false
  hide = true;
  error: boolean = false;
  passwordError: boolean = false;

  message: string = '';

  newUser = new User();
  passwordConfirm: string = '';


  constructor(private home: HomeComponent,
    private _us: UserService,
    public dialog: MatDialog
  ) {
    this.home.title = 'Usuarios'
    if (JSON.parse(localStorage.getItem('users')) != null) {
      this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('users')));
    }
  }

  ngOnInit() {
  }

  getData(){
    if (JSON.parse(localStorage.getItem('users')) != null) {
      this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('users')));
    }
  }

  addUser() {
    if (this.newUser.password != this.passwordConfirm) {
      let message = 'Contraseña no Coinciden';
      let title = 'Error';
      this.openDialog(message, title);
    } else {
      this._us.addUser(this.newUser);
      this.newUser = new User();
      this.passwordConfirm = '';
      this.add = !this.add;
      this.getData();
    }
  }
  
  remove(index){
    this.dataSource = new MatTableDataSource(this._us.remove(index));
  }

  openDialog(message, title): void {
    const dialogRef = this.dialog.open(DialogsComponent, {
      width: '250px',
      data: { message: message, title: title }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}