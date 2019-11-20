import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';

import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
 
  products: Store[];
  
  

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.storeService.getProducts()
    .subscribe(products => this.products = products);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.storeService.addProducts({ name } as Store)
      .subscribe(products => {
        this.products.push(products);
      });
  }

  delete(products: Store): void {
    this.products = this.products.filter(p => p !== products);
    this.storeService.deleteProducts(products).subscribe();
  }

}

