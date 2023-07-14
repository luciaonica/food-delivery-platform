import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent {

  constructor(private router: Router) { }

  goToCustomerPage() {
    this.router.navigate(['menu'])
  }

}
