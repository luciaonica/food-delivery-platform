import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dish } from 'src/app/entities/Dish';
import { AuthService } from 'src/app/services/auth.service';
import { DishService } from 'src/app/services/dish.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent {  
  
  username = '';  
  dishes: Dish[] = [];
  isDev: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;
  restaurantId: number = 0;
  restaurantName = "";
  imageUrl: string | ArrayBuffer | null = null;
  selectedDish: Dish | null = null; 
  isEnabled: boolean = false;
  modalDishId: number | undefined;

  constructor(
          private router: Router,
          private authService: AuthService,
          private restaurantService: RestaurantService,
          private dishService: DishService) { }          

  ngOnInit() {
    this.loadDishes();
    this.isDev = this.authService.isAuthenticatedDev();
    //console.log(this.username);
  }

  currentUser(): string{
    return localStorage.getItem('currentUser') as string;
  }

  async loadDishes() {
    this.username = this.currentUser();

    this.restaurantService.getRestaurantByUsername(this.username).subscribe((restaurant: any) => {
      this.restaurantId = restaurant.id;
      this.restaurantName = restaurant.name;
      this.isEnabled = restaurant.enabled;
      console.log(this.isEnabled);
      console.log(restaurant);
            
      this.dishService.dishList(this.restaurantId).subscribe((dishes) => {
        this.dishes = dishes;
        this.dishes.forEach(dish => {
          dish.imageUrl = this.getImageUrl(dish);
        })
      });
    });
  }

  getImageUrl(dish: Dish): string {
    console.log("https://shopme-my-files.s3.amazonaws.com" + "/dish-images/" + dish.id + "/" + dish.picture)
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

  delete(id:number){
    this.dishService.deleteDish(id).subscribe((result:any) => {
      if(result){
        console.log(result);
        this.closeDeleteModal();
        this.loadDishes();
      }
    })
  }

  openDeleteModal(dishId: number) {
    this.modalDishId = dishId;
    const modelDiv = document.getElementById('deleteModal');
    if (modelDiv != null){
      modelDiv.style.display = 'block';
    }   
  }

  closeDeleteModal() {
    const modelDiv = document.getElementById('deleteModal');
    if (modelDiv != null){
      modelDiv.style.display = 'none';
    }   
  }
}
