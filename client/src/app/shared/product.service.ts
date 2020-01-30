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
   * Get all products
   * @param category 
   */
  getAllProducts(): Observable<any> {
    return this.http.get<Product[]>(this.baseUrl + '/products/');

  }
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
  /**
   * Modify a product 
   * @param product 
   */
  editProduct(product): Observable<any> {
    return this.http.put<Product>(this.baseUrl + '/products/' + product.id, product);

  }

  /**
   * Create a product 
   * @param product 
   */
  createProduct(product): Observable<any> {
    return this.http.post<Product>(this.baseUrl + '/products/', product);

  }

  /**
   * Delete a product 
   * @param product 
   */
  delProduct(product): Observable<any> {
    return this.http.delete<Product>(this.baseUrl + '/products/' + product.id);

  }
  
}
