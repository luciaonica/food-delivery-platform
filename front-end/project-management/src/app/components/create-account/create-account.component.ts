import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/entities/User';
import { AuthService } from 'src/app/services/auth.service';
import { Restaurant } from 'src/app/entities/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  username!: string;
  password!: string;
  confirmPassword!: string;
  userCreated!: User;
  name!: string;
  address!: string;
  email!: string;
  license!: string;
  description!: string;
  fileToUpload: File | null = null;
  imageToUpload: File | null = null;
  restaurantId: number = 0;
  imageUrl: string | ArrayBuffer | null = null;
  message: string = '';

  constructor(private accountService: AccountService,
              private authService: AuthService,
              private restaurantService: RestaurantService,
              private router: Router) { }

  ngOnInit(): void {
    /* this.restaurantService.getImageUrl().subscribe(
      (url: string) => {
        this.imageUrl = url;
        console.log(url);
      },
      (error) => {
        console.log(error);
      }
    ); */
  }

  onSubmit() {
   
    this.authService.deauthenticateClient();
    this.authService.deauthenticateDev();

    const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let email: string = this.email;

    if ((!this.username) || (!this.password) || (!this.confirmPassword) || 
    (!this.name) || (!this.address) || (!this.email) || (!this.description)){
      //alert('Please enter all fields!');
      this.openWarningModal();
      this.message = "Please complete all the fields!";
      
    } else if (this.password !== this.confirmPassword) {
      //alert("Passwords do not match. Please try again.")
      this.openWarningModal();
      this.message = "Passwords do not match. Please try again.";
     
    } else if (this.password.length < 5){
      //alert("file is required.")
      this.openWarningModal();
      this.message = "Password sould be 5 or more characters.";
      
    } else if (!this.fileToUpload){
      //alert("file is required.")
      this.openWarningModal();
      this.message = "License file is required.";
      
    } else if (!EMAIL_REGEXP.test(email)) {
      //alert("Enter valid email!");    
      this.openWarningModal();
      this.message = "email is not valid";
    } else {
      const newUser: User = {
        username: this.username,
        password: this.password,
        enabled: true,
        roles: [{ 'id': 2, 'name': "ROLE_RESTAURANT" }]
      }
      this.accountService.addUser(newUser).subscribe((user: User) => {
        this.userCreated = user;
  
      });
  
      const newRestaurant: Restaurant = {
        name: this.name,
        username: this.username,
        address: this.address,
        email: this.email,
        password: this.password,
        license: this.fileToUpload?.name || '',
        registerDate: new Date(),
        enabled: true,
        picture: this.imageToUpload?.name || '',
        description: this.description,
        hasPendingRequest: false,
      }
  
      this.restaurantService.addRestaurant(newRestaurant).subscribe((restaurant: Restaurant) => {
        console.log(restaurant.id);
        this.restaurantId = restaurant.id || 0;
        console.log(this.restaurantId);
        this.uploadPdf(this.restaurantId);
      });
      
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.name = '';
      this.address = '';
      this.email = '';
    }
    
  }

  uploadPdf(restaurantId: number) {
    if (!this.fileToUpload) {
      alert('No file selected.');
      return;
    } else {
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

    this.openRegisterModal();
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

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
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
}
