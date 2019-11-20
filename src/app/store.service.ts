import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Store } from './store';
import { ShoppingService } from './shopping.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // private storeUrl = 'api/products';
  private heroesUrl = 'api/heroes';  // URL to web api

  // private ApiURL: string = 'https://localhost:44308/api/ToDo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private shoppingService: ShoppingService) { }

  /** GET heroes from the server */
  getProduct (): Observable<Store[]> {
    return this.http.get<Store[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<Store[]>('getStore', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getProductsNo404<Data>(id: number): Observable<Store> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Store[]>(url)
      .pipe(
        map(products => products[0]), // returns a {0|1} element array
        tap(p => {
          const outcome = p ? `fetched` : `did not find`;
          this.log(`${outcome} products id=${id}`);
        }),
        catchError(this.handleError<Store>(`getStore id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getProducts(id: number): Observable<Store> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Store>(url).pipe(
      tap(_ => this.log(`fetched products id=${id}`)),
      catchError(this.handleError<Store>(`getStore id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchProducts(term: string): Observable<Store[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Store[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found products matching "${term}"`)),
      catchError(this.handleError<Store[]>('searchProducts', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addProducts (products: Store): Observable<Store> {
    return this.http.post<Store>(this.heroesUrl, products, this.httpOptions).pipe(
      tap((newProducts: Store) => this.log(`added products w/ id=${newProducts.id}`)),
      catchError(this.handleError<Store>('addProducts'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteProducts (products: Store | number): Observable<Store> {
    const id = typeof products === 'number' ? products : products.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Store>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted products id=${id}`)),
      catchError(this.handleError<Store>('deleteProducts'))
    );
  }

  /** PUT: update the hero on the server */
  updateProducts (products: Store): Observable<any> {
    return this.http.put(this.heroesUrl, products, this.httpOptions).pipe(
      tap(_ => this.log(`updated products id=${products.id}`)),
      catchError(this.handleError<any>('updateProducts'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.shoppingService.add(`StoreService: ${message}`);
  }
}