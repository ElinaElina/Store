import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './components/store/store.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { StoreDetailsComponent }  from './store-details/store-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'store/:id', component: StoreDetailsComponent },
  { path: 'products', component: StoreComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
