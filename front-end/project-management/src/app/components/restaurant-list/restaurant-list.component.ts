import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/entities/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { faEdit, faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent {

  clientName = "";
  clientId:number=0;
  faFile = faFile;
  restaurants: Restaurant[] = [];  

  constructor(private restaurantService: RestaurantService,               
              private router: Router){}
  
  ngOnInit() {    
    //console.log("Length" + this.projects.length);
    this.loadRestaurants();   
  }

  async loadRestaurants() {

    this.restaurantService.restaurantList().subscribe((restaurants :any) => {
      this.restaurants = restaurants;
      this.restaurants.forEach(restaurant => {
        restaurant.imageUrl = this.getImageUrl(restaurant);
      });
      console.log(restaurants.length);
    });         
  }
  
  getImageUrl(restaurant: Restaurant): string {
    console.log("https://shopme-my-files.s3.amazonaws.com" + "/profile-images/" + restaurant.id + "/" + restaurant.picture)
    return "https://shopme-my-files.s3.amazonaws.com" + "/profile-images/" + restaurant.id + "/" + restaurant.picture;
  }

}
