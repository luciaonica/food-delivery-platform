import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/entities/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  //projects: Project[] = [];
  restaurantId: number = 0;
  restaurant!: Restaurant;
  username = '';
  //modalProjectId: number | undefined;
  //faEdit = faEdit;

  constructor(private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.username = this.currentUser();
    this.restaurantService.getRestaurantByUsername(this.username).subscribe((restaurant: any) => {
      this.restaurantId = restaurant.id;
      this.restaurant = restaurant;

      console.log(restaurant);

    });

  }
  currentUser(): string {
    return localStorage.getItem('currentUser') as string;
  }

  updateRestarant(id: number){
    //console.log('restaurants/update/'+id)
    this.router.navigate(['restaurants/update/'+id]);
  }

  openLicense(restaurant: Restaurant){
    const objectUrl = "https://shopme-my-files.s3.amazonaws.com" + "/license-files/" + restaurant.id + "/" + restaurant.license;
    //alert(objectUrl);
    window.open(objectUrl, '_blank');
  }

}
