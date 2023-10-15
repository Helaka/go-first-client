import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private apiUrl = 'http://13.212.196.209:3100'; // Replace with your Node.js API URL

  constructor(private http: HttpClient) { }


  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }
}
