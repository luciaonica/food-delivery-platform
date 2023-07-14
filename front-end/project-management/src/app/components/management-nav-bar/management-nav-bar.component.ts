import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivationRequest } from 'src/app/entities/ActivationRequest';
import { ActivationRequestService } from 'src/app/services/activation-request.service';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-management-nav-bar',
  templateUrl: './management-nav-bar.component.html',
  styleUrls: ['./management-nav-bar.component.css']
})
export class ManagementNavBarComponent implements OnInit {
  username = '';
  isDisabled: boolean = false;
  restaurantId: number = 0;
  hasPendingRequest: boolean = false;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private restaurantService: RestaurantService,
              private activationRequestService: ActivationRequestService,
              private location: Location) { }

  ngOnInit(): void {
    this.username = this.currentUser();
    if (this.username !== 'admin') {
      this.restaurantService.getRestaurantByUsername(this.username).subscribe((restaurant: any) => {
        this.isDisabled = !restaurant.enabled;
        this.restaurantId = restaurant.id;
        this.hasPendingRequest = restaurant.hasPendingRequest;
        //console.log(this.isDisabled);
      })
    }
  }

  logout() {
    this.authenticationService.deauthenticateClient();
    this.authenticationService.deauthenticateDev();
    localStorage.clear();
    this.router.navigate(['']);
    this.closeLogoutModal();
  }

  currentUser(): string {
    return localStorage.getItem('currentUser') as string;
  }

  isAdmin(): boolean {
    return this.username == 'admin';
  }

  clientRegistered(): boolean {
    let clientId = parseInt(localStorage.getItem('clientId') || '0', 10);
    if (clientId == 0) {
      return false;
    } else {
      return true;
    }
  }

  createRequest() {
    const request: ActivationRequest = {
      status: "pending",
      requestDate: new Date(),
      restaurant: { 'id': this.restaurantId, 'name': "", address: "", email: "", username: "", license: "", registerDate: new Date(), password: "", enabled: false, picture: "", description: "", hasPendingRequest:false }
    }

    this.activationRequestService.createActivationRequest(request).subscribe((response) => {
      if (response) {
        console.log(response);
        this.openSuccessModal();
      } else {
        this.openErrorModal();
      }
    });
  }

  openSuccessModal() {
    const modelDiv = document.getElementById('successModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeSuccessModal() {
    const modelDiv = document.getElementById('successModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  redirect() {
    this.hasPendingRequest = true;
    this.closeSuccessModal();
    
  }

  openErrorModal() {
    const modelDiv = document.getElementById('errorModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  openLogoutModal() {
    const modelDiv = document.getElementById('logoutModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeLogoutModal() {
    const modelDiv = document.getElementById('logoutModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

}
