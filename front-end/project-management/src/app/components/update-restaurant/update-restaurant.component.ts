import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/entities/Restaurant';
import { User } from 'src/app/entities/User';
import { AccountService } from 'src/app/services/account.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {
  restaurant: Restaurant = {} as Restaurant;
  user: User = {} as User;
  fileToUpload: File | null = null;
  selectedFileName?: string | null;
  imageToUpload: File | null = null;
  selectedImageName?: string | null;
  password!: string|null;
  confirmPassword!: string;
  imageUrl: string | ArrayBuffer | null = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private accoutService: AccountService,
    private authService: AuthService, 
    private location: Location) { }

  ngOnInit(): void {
    let restaurantId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.restaurantService.getRestaurantById(restaurantId).subscribe(
      (restaurant: Restaurant) => {
        this.restaurant = restaurant;
        this.selectedFileName = restaurant.license;
        this.selectedImageName = restaurant.picture; 
        this.user.username = restaurant.username;       
      },
      (error: any) => {
        console.error('Error retriving restaurant: ', error);
      }
    );
    this.restaurantService.getImageUrl(restaurantId).subscribe((result) => {
      console.log(result);
      this.imageUrl = result;
    })
  }

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match. Please try again.")
      return;
    }

    if (this.password){
      this.restaurant.password = this.password;
      this.user.password = this.password;
    } else {
      this.user.password = null;
      this.restaurant.password =null;
    }

    if (this.restaurant && this.imageToUpload) {
      this.restaurant.picture = this.imageToUpload.name;
    }

    if (this.restaurant && this.fileToUpload) {
      this.restaurant.license = this.fileToUpload.name;
    }
    if (this.password){
      
    this.accoutService.updateUser(this.user).subscribe((result) => {
      console.log(result);
      localStorage.clear();
        
        this.authService.deauthenticateClient();
        this.authService.deauthenticateDev();
        
         
    });
    }

    this.restaurantService.updateRestaurant(this.restaurant).subscribe(
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
    this.restaurant.id && this.uploadPdf(this.restaurant.id);
    this.restaurant.id && this.uploadImage(this.restaurant.id);
  }

  uploadPdf(restaurantId:number) {
    if (this.fileToUpload) {
      this.restaurantService.uploadPdf(restaurantId, this.fileToUpload).subscribe(
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
    this.openRegisterModal();
  }

  uploadImage(restaurantId:number) {
    if (this.imageToUpload){
      this.restaurantService.uploadImage(restaurantId, this.imageToUpload).subscribe(
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

  redirectToLogin() {
    if (this.password) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['about']);
    }
    
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
    this.selectedFileName = this.fileToUpload ? this.fileToUpload.name : this.selectedFileName;
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

  cancel() {
    this.router.navigate(['/about']);
  }

}
