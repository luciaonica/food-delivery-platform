import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dish } from 'src/app/entities/Dish';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.css']
})
export class CustomerNavbarComponent implements OnInit{
  searchTerm: string = '';
  dishes: Dish[] = [];
  cartItems: Observable<number> = new Observable<number>();

  constructor(private dishService: DishService,
              private router: Router){}

  ngOnInit(): void {
    this.cartItems = this.dishService.cartItems$;
  }

  doSearch(keyword: string): void {    
    console.log('Search term:', keyword);
    this.router.navigateByUrl(`/search/${keyword}`);
  }

  async loadDishes() {
      
    this.dishService.customerDishList().subscribe((dishes) => {
      this.dishes = dishes;
      this.dishes.forEach(dish => {
        dish.imageUrl = this.getImageUrl(dish);
      })
    });
  }

  getImageUrl(dish: Dish): string {
    //console.log("https://shopme-my-files.s3.amazonaws.com" + "/dish-images/" + dish.id + "/" + dish.picture)
    return "https://shopme-my-files.s3.amazonaws.com" + "/dish-images/" + dish.id + "/" + dish.picture;
  }
}
