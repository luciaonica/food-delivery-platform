import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Restaurant } from 'src/app/entities/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-view-client-info',
  templateUrl: './view-client-info.component.html',
  styleUrls: ['./view-client-info.component.css']
})
export class ViewClientInfoComponent implements OnInit{
  
  clientId:number=0;
  
  modalRestaurantId: number | undefined;
  faEdit = faEdit;

  restaurant!: Restaurant;

  constructor(
              private restaurantService: RestaurantService,
              private route: ActivatedRoute,
              private location: Location){}

  ngOnInit() {
    this.clientId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.restaurantService.getRestaurantById(this.clientId).subscribe((restaurant) => this.restaurant = restaurant);
    
  }

  openDisableModal(restaurantId: number) {
    this.modalRestaurantId = restaurantId;
    const modelDiv = document.getElementById('disableModal');
    if (modelDiv != null){
      modelDiv.style.display = 'block';
    }   
  }

  closeDisableModal() {
    const modelDiv = document.getElementById('disableModal');
    if (modelDiv != null){
      modelDiv.style.display = 'none';
    }   
  }

  openEnableModal(restaurantId: number) {
    this.modalRestaurantId = restaurantId; 
    const modelDiv = document.getElementById('enableModal');
    if (modelDiv != null){
      modelDiv.style.display = 'block';
    }   
  }

  closeEnableModal() {
    const modelDiv = document.getElementById('enableModal');
    if (modelDiv != null){
      modelDiv.style.display = 'none';
    }   
  }

  enabled(id:number, status: boolean) {
    this.restaurantService.updateStatus(id, !status).subscribe((response) => {
      console.log(response);
      this.closeDisableModal();
      this.closeEnableModal();
      //this.loadProjects();
      this.restaurantService.getRestaurantById(this.clientId).subscribe((restaurant) => this.restaurant = restaurant);
    });   
  }

  openLicense(restaurant: Restaurant){
    const objectUrl = "https://shopme-my-files.s3.amazonaws.com" + "/license-files/" + restaurant.id + "/" + restaurant.license;
    //alert(objectUrl);
    window.open(objectUrl, '_blank');
  }

  goBack(){
    this.location.back();
  }

}
