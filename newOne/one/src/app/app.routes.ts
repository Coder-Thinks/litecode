import { Routes } from '@angular/router';

import { ClientComponent } from '../Com/client/client.component';
import { ClientDateComponent } from '../Com/client-date/client-date.component';


export const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    title:'Clients'
    },
    {
    path: ':id',
    component:ClientDateComponent,
    title:'Data'
    }
];
