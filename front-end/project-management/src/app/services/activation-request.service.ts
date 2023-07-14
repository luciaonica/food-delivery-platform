import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivationRequest } from '../entities/ActivationRequest';

@Injectable({
  providedIn: 'root'
})
export class ActivationRequestService {

  //private apiUrl = 'http://localhost:8081'

  private apiUrl = 'http://foodplatform-env.eba-mxc2it2e.us-east-1.elasticbeanstalk.com';
  
  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient) { }

  createActivationRequest(request: ActivationRequest): Observable<ActivationRequest> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.post<ActivationRequest>(`${this.apiUrl}/admin/activation-requests`, request, this.httpOptions);
  }

  getAllActivationRequests(): Observable<ActivationRequest[]> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.get<ActivationRequest[]>(`${this.apiUrl}/admin/activation-requests`, this.httpOptions);
  }

  approveRequest(id: number){
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.get(`${this.apiUrl}/admin/approve/${id}`, {
      headers: this.httpOptions.headers,
      responseType: 'text'
    });
  }
}
