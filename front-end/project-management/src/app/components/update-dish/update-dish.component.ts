import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from 'src/app/entities/Dish';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-update-dish',
  templateUrl: './update-dish.component.html',
  styleUrls: ['./update-dish.component.css']
})
export class UpdateDishComponent implements OnInit{
  dish: Dish = {} as Dish;
  imageUrl: string | ArrayBuffer | null = null;
  imageToUpload: File | null = null;
  selectedImageName?: string | null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dishService: DishService) { }

  ngOnInit(): void {
    let dishId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.dishService.getDishById(dishId).subscribe(
      (dish: Dish) => {
        this.dish = dish;
        
        this.selectedImageName = dish.picture;
      },
      (error: any) => {
        console.error('Error retriving restaurant: ', error);
      }
    );
    this.dishService.getImageUrl(dishId).subscribe((result) => {
      console.log(result);
      this.imageUrl = result;
    })
  }

  async onSubmit() {

    if (this.dish && this.imageToUpload) {
      this.dish.picture = this.imageToUpload.name;
    }

    this.dishService.updateDish(this.dish).subscribe(
      (response: any) => {
        // Handle success response
        console.log('Update success:', response);
        // Perform any additional actions (e.g., show success message, redirect)
      },
      (error: any) => {
        // Handle error response
        console.error('Update error:', error);
        // Perform any additional error handling (e.g., show error message)
      }
    );
    this.dish.id && this.uploadImage(this.dish.id);
    this.openRegisterModal();
    //this.router.navigate(['/about']);
    //this.router.navigate(['/dishes']);
  }

  uploadImage(dishId:number) {
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
    this.router.navigate(['/dishes']);
  }

}
