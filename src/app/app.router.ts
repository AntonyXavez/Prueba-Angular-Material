import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent, UsersComponent, SearchCustomerComponent,
         AccountsComponent, OperationsComponent } from './components/components';

const APP_ROUTES: Routes = [
  { path: 'search-customer', component: SearchCustomerComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'users', component: UsersComponent },
  { path: 'customer/:id/accounts', component: AccountsComponent },
  { path: 'operations/account/:id', component: OperationsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'search-customer' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
