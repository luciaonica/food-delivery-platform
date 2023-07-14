import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit{
  imageUrl: string | ArrayBuffer | null = null;
  description = '';
  username = '';
  restaurantId: number = 0;
  restaurantName = '';

  constructor(private authService:AuthService,
              private restaurantService:RestaurantService){}

  ngOnInit(): void {
    this.username = this.currentUser();
    if (this.username !== 'admin') {
      this.restaurantService.getRestaurantByUsername(this.username).subscribe((restaurant: any) => {
        this.restaurantName = restaurant.name;
        this.restaurantId = restaurant.id;
        this.description = restaurant.description;
        this.restaurantService.getImageUrl(this.restaurantId).subscribe((result) => {
          console.log(result);
          this.imageUrl = result;
        })
        console.log(this.description);
      })
    }
  }

  currentUser(): string {
    return localStorage.getItem('currentUser') as string;
  }

  isClientAuth(){
    return this.authService.isAuthenticatedClient();
  }

  
}
