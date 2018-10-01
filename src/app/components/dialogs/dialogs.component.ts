import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Banks } from '../../enums/banks.enum';
import { Check } from '../../interfaces/check';
import { Detail } from '../../interfaces/detail';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogActiveComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}



@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class CashComponent implements OnInit {

  detail: Detail = new Detail();

  constructor(public dialogRef: MatDialogRef<CashComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(this.detail);
  }

}

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class CheckDialogComponent implements OnInit {

  banks: string[] = Object.values(Banks);
  displayedColumns: string[] = ['number', 'bank', 'total', 'options'];
  dataSource = new MatTableDataSource();

  checks: Check[] = [];
  check: Check = new Check();
  checkId: number = 0;
  detail: Detail = new Detail();
  constructor(public dialogRef: MatDialogRef<CheckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.check == 'own') {
      this.check.bank = Banks.GYT;
    }

    if (JSON.parse(localStorage.getItem('checkId')) != null) {
      this.checkId = JSON.parse(localStorage.getItem('checkId'));      
    }
    // if (data.checks != null) {
    //   this.checks = data.checks;      
    // }
    for (let i = 0; i < this.banks.length; i++) {
      if (this.banks[i] == 'G&T') {
        this.banks.splice(i, 1);
      }
    }
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.detail.ownCheck = this.checks;
    this.dialogRef.close(this.detail);
  }

  addCheck() {
    this.checkId += 1;
    this.check.id = this.checkId;
    this.checks.push(this.check);
    this.check = new Check();
    this.dataSource = new MatTableDataSource(this.checks);
    localStorage.setItem('checkId',JSON.stringify(this.checkId));
  }

}

