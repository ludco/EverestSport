import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products : Product[]= [];

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Get all products by category
   * @param category 
   */
  getProductsByCat(category): Observable<any> {
    return this.http.get<Product[]>(this.baseUrl + '/products/?category='+ category);

  }
  /**
   * Get the Big promo product
   */
  getBigPromo(): Observable<any> {
    return this.http.get<Product>(this.baseUrl + '/products/?bigPromo=1');

  }
  
}
