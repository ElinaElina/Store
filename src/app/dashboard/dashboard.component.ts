import { Component, OnInit } from '@angular/core';
import { Store } from '../store';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  products: Store[] = [];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.storeService.getProduct()
      .subscribe(products => this.products = products.slice(1, 5));
  }
}
