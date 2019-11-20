import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store }         from '../store';
import { StoreService }  from '../store.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {
  @Input() products: Store;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.storeService.getProducts(id)
      .subscribe(products => this.products = products);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.storeService.updateProducts(this.products)
      .subscribe(() => this.goBack());
  }
}
