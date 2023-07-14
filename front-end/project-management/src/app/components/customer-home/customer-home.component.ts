import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from 'src/app/entities/Dish';
import { DishService } from 'src/app/services/dish.service';
import { faShoppingCart, faShoppingBasket, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit{

  searchMode: boolean = false;
  faShoppingCart = faShoppingBasket;
  faInfoCircle = faInfoCircle;

  dishes: Dish[] = [];
  imageUrl: string | ArrayBuffer | null = null;
  selectedDish: Dish | null = null; 

  constructor(
              private dishService: DishService,
              private route: ActivatedRoute,) { }   
  
    ngOnInit() {
      this.loadDishes();
    }

    async loadDishes() {
      this.searchMode = this.route.snapshot.paramMap.has('keyword');
      console.log(this.searchMode);

      if (this.searchMode) {
        this.handleSearchDishes();
      } else {
        this.handleListDishes();
      }
    }

    getImageUrl(dish: Dish): string {
      //console.log("https://shopme-my-files.s3.amazonaws.com" + "/dish-images/" + dish.id + "/" + dish.picture)
      return "https://shopme-my-files.s3.amazonaws.com" + "/dish-images/" + dish.id + "/" + dish.picture;
    }

    openDishInfoModal(dish: Dish) {
      this.selectedDish = dish; // Set the selected dish
      // Open the modal using its ID
      const dishInfoModal = document.getElementById('dishInfoModal');
      if (dishInfoModal) {
        dishInfoModal.classList.add('show');
        dishInfoModal.style.display = 'block';
      }
    }
  
    closeDishInfoModal() {
      this.selectedDish = null; // Reset the selected dish
      // Close the modal using its ID
      const dishInfoModal = document.getElementById('dishInfoModal');
      if (dishInfoModal) {
        dishInfoModal.classList.remove('show');
        dishInfoModal.style.display = 'none';
      }
    }

    handleListDishes() {
      this.dishService.customerDishList().subscribe((dishes) => {
        this.dishes = dishes;
        this.dishes.forEach(dish => {
          dish.imageUrl = this.getImageUrl(dish);
        })
      });
    }

    handleSearchDishes() {
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword') || '';

      this.dishService.searchDishes(theKeyword).subscribe(
        data => {
          this.dishes = data;
          this.dishes.forEach(dish => {
            dish.imageUrl = this.getImageUrl(dish);
          })
        }
      );
    }

}
