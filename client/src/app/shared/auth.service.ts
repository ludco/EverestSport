import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'


  constructor(private http: HttpClient, private router : Router) { }

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
   * Get token
   */
  getToken(): string {
    return localStorage.getItem('token');
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

  /**
   * Who is connected ?
   */
  loadUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/me`)
  }

  displayConnect(){
    if (localStorage.getItem('email')) {
      return localStorage.getItem('email')
    }
  }

  /**
   * logout
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.displayConnect();
    this.router.navigateByUrl('/connect');
}
}
