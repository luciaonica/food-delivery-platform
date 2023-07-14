import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //private userApi = 'http://localhost:8081/api/users'
  //private devApi = 'http://localhost:8081/api/dev';

  private devApi = 'http://foodplatform-env.eba-mxc2it2e.us-east-1.elasticbeanstalk.com/api/dev';
  private userApi = 'http://foodplatform-env.eba-mxc2it2e.us-east-1.elasticbeanstalk.com/api/users';

  
  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http:HttpClient) { }

  addUser(user: User): Observable<User>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<User>(this.userApi, user, this.httpOptions);
  }
  addDev(user: User): Observable<User>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.post<User>(this.devApi,user, this.httpOptions);
  }
  getAllUsers(): Observable<User[]> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.get<User[]>(this.userApi, this.httpOptions);
  }

  loginCheck(user: User): Observable<User> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.userApi}/login`;
    return this.http.post<User>(url,user, this.httpOptions);
  }

  updateUser(user: User): Observable<User> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    const url = `${this.userApi}/${localStorage.getItem('currentUser') as string}`;
    return this.http.put<User>(url,user,this.httpOptions);
  }
}
