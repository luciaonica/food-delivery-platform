import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../entities/Restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  //private apiUrl = 'http://localhost:8081'
  private apiUrl = 'http://foodplatform-env.eba-mxc2it2e.us-east-1.elasticbeanstalk.com';
  clientName = "";
  clientId:number=0;
  username = localStorage.getItem('currentUser');
  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  

  constructor(private http: HttpClient) { }

  getRestaurantByUsername(username: string){
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.get<Restaurant>(`${this.apiUrl}/admin/restaurants/client_by_username/${username}`, this.httpOptions);
  }

  getRestaurantById(id:number) {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.get<Restaurant>(`${this.apiUrl}/admin/restaurants/${id}`, this.httpOptions);
  }

  restaurantList(){
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.get<Restaurant[]>(`${this.apiUrl}/admin/restaurants`, this.httpOptions);
  }

  addRestaurant(newRestaurant: Restaurant): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/restaurants`, newRestaurant);
  }

  uploadPdf(clientId: number, fileToUpload: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.apiUrl}/admin/restaurants/uploadLicense/${clientId}`, formData, {
      responseType: 'text'
    });
  }

  uploadImage(clientId: number, fileToUpload: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.apiUrl}/admin/restaurants/uploadImage/${clientId}`, formData, {
      responseType: 'text'
    });
  }

  getImageUrl(restaurantId: number): Observable<string> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    const url = `${this.apiUrl}/admin/restaurants/getImageUrl/${restaurantId}`;

    return this.http.get(url, {
      headers: this.httpOptions.headers,
      responseType: 'text'
    });
  }

  updateStatus(restaurantId: number, status: boolean){
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    //alert(restaurantId);
    return this.http.get(`${this.apiUrl}/admin/restaurants/${restaurantId}/update_status/${status}`, {
      headers: this.httpOptions.headers,
      responseType: 'text'
    });
  }

  updateRestaurant(restaurant: Restaurant) {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    console.log(restaurant);
    return this.http.put(`${this.apiUrl}/admin/restaurants`, restaurant, this.httpOptions);
  }
}
