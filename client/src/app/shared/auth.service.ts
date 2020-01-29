import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
