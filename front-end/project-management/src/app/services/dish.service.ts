import { Injectable } from '@angular/core';
import { Dish } from '../entities/Dish';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  //private apiUrl = 'http://localhost:8081'
  private apiUrl = 'http://foodplatform-env.eba-mxc2it2e.us-east-1.elasticbeanstalk.com';
  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  dishList(restaurantId: number) {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    });
    return this.http.get<Dish[]>(`${this.apiUrl}/admin/restaurants/dishes/${restaurantId}`, this.httpOptions);
  }

  customerDishList(){
    return this.http.get<Dish[]>(`${this.apiUrl}/admin/dishes`)
  }

  addDish(newDish:Dish): Observable<any>{    
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.post(`${this.apiUrl}/admin/dishes`, newDish, this.httpOptions);    
  }

  uploadImage(dishId: number, fileToUpload: File): Observable<any> {
    
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.apiUrl}/admin/dishes/uploadImage/${dishId}`, formData, {responseType: 'text'});
  }

  getDishById(id:number) {
    return this.http.get<Dish>(`${this.apiUrl}/admin/dishes/${id}`);
  }

  getImageUrl(dishId: number): Observable<string> {
    const url = `${this.apiUrl}/admin/dishes/getImageUrl/${dishId}`;

    return this.http.get(url, {responseType: 'text'});
  }

  updateDish(dish: Dish) {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    console.log(dish);
    return this.http.put(`${this.apiUrl}/admin/dishes`, dish, this.httpOptions);
  }

  deleteDish(id: number){
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.delete(`${this.apiUrl}/admin/dishes/${id}`, {
      headers: this.httpOptions.headers,
      responseType: 'text'
    });
  }

  searchDishes(theKeyword:string): Observable<Dish[]>{
    return this.http.get<Dish[]>(`${this.apiUrl}/admin/search/findByName?name=${theKeyword}`);
  }
}
