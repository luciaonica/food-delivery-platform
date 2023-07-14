import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Dish } from 'src/app/entities/Dish';
import { DishService } from 'src/app/services/dish.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent {

  name!: string;
  description!: string;
  size!: string;
  price!: number;
  imageUrl: string | ArrayBuffer | null = null;
  restaurantId: number = 0;
  restaurantName = "";
  imageToUpload: File | null = null;
  username = '';
  dishId: number = 0;
  message: string = '';

  constructor(
    private restaurantService: RestaurantService,
    private dishService: DishService,
    private router: Router,
    private location: Location) { }

  onSubmit() {
    if ((!this.name) || (!this.description) || (!this.size) || (!this.price)) {
      this.openWarningModal();
      this.message = "Please complete all the fields!";
    } else if (!this.imageToUpload){
      //alert("file is required.")
      this.openWarningModal();
      this.message = "Please choose an image.";      
    } else {
      this.username = this.currentUser();

      this.restaurantService.getRestaurantByUsername(this.username).subscribe((restaurant: any) => {
  
        console.log(restaurant);
  
        const newDish: Dish = {
          name: this.name,
          description: this.description,
          size: this.size,
          price: this.price,
          picture: this.imageToUpload?.name || '',
          restaurant: { 'id': restaurant.id, 'name': "", address: "", email: "", username: "", license: "", registerDate: new Date(), password: "", enabled: false, picture: "", description:"", hasPendingRequest: false }
        }
  
        console.log(newDish);
  
        this.dishService.addDish(newDish).subscribe((dish: Dish) => {
          console.log(dish);
          this.dishId = dish.id || 0;
          //alert('Dish added succesfully!');        
          this.uploadImage(this.dishId);
          //alert(this.dishId)
          //this.router.navigate(['/dishes']);
        });
      });
      this.openRegisterModal();
      
    }   
  }

  uploadImage(dishId: number) {

    if (this.imageToUpload){
      this.dishService.uploadImage(dishId, this.imageToUpload).subscribe(
        response => {
          // Handle success response
          console.log('Registration success:', response);
        },
        error => {
          // Handle error response
          console.error('Registration error:', error);
        }
      );
      
    }    
  }

  currentUser(): string{
    return localStorage.getItem('currentUser') as string;
  }

  onImageSelected(event: any) {
    this.imageToUpload = event.target.files[0];

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  openRegisterModal() {    
    const modelDiv = document.getElementById('registerModal');
    if (modelDiv != null){
      modelDiv.style.display = 'block';
    }   
  }

  closeRegisterModal() {
    const modelDiv = document.getElementById('registerModal');
    if (modelDiv != null){
      modelDiv.style.display = 'none';
    } 
  }

  redirect() {
    this.router.navigate(['/dishes']);
  }

  cancel() {
    this.location.back();
  }

  openWarningModal() {    
    const modelDiv = document.getElementById('warningModal');
    if (modelDiv != null){
      modelDiv.style.display = 'block';
    }   
  }

  closeWarningModal() {
    const modelDiv = document.getElementById('warningModal');
    if (modelDiv != null){
      modelDiv.style.display = 'none';
    } 
  }

}
