import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StoreComponent } from './components/store/store.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreSearchComponent } from './store-search/store-search.component';
import { ShoppingComponent } from './shopping/shopping.component';



@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    HeaderComponent,
    StoreDetailsComponent,
    DashboardComponent,
    StoreSearchComponent,
    ShoppingComponent,
   
    
  ],
  imports: [
   
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
