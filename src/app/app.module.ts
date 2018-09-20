import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';

import { APP_ROUTING } from './app.router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginService, UserService, AccountService, CustomerService, SearchService } from './providers/services';
import { UsersComponent } from './components/users/users.component';
import { DialogsComponent, DialogActiveComponent } from './components/dialogs/dialogs.component';
import { RoleTextPipe } from './pipes/role-text.pipe';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { AccountsComponent } from './components/accounts/accounts.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CustomerComponent,
    UsersComponent,
    DialogsComponent,
    RoleTextPipe,
    SearchCustomerComponent,
    AddAccountComponent,
    AccountsComponent,
    DialogActiveComponent
  ],
  entryComponents:[
    AddAccountComponent,
    DialogsComponent,
    DialogActiveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [ 
    LoginService,
    UserService,
    AccountService,
    CustomerService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
