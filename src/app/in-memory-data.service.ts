import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Store } from './store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {

  const products = [
    { id: 11, name: 'Rose' },
    { id: 12, name: 'Rosiline' },
    { id: 13, name: 'Black' },
    { id: 14, name: 'Lily' },
    { id: 15, name: 'Brey' },
    { id: 16, name: 'Dukrey' },
    { id: 17, name: 'Same' },
  ];

  return {products};
}
genId(products: Store[]): number {
  return products.length > 0 ? Math.max(...products.map(products => products.id)) + 1 : 11;
}
}