import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  /**
   * Create a new User
   * @param user 
   */
  createUser(user): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, user);
  }

  /**
   * Signin
   * @param user 
   */
  signin(user): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signin`, user)
      .pipe(
        tap(results => {
          if (results) {
            this.storeCredentials(results);
          }
        })
      );
  }

  /**
   * Store credentials
   * @param credentials 
   */
  private storeCredentials(credentials) {
    if (credentials.token) {
      localStorage.setItem('token', credentials.token)
    }
    if (credentials.email) {
      localStorage.setItem('email', credentials.email)
    }
  }
}
