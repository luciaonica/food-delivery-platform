import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ManagementNavBarComponent } from './components/management-nav-bar/management-nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { ClientGuard } from './guard/client-guard';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { AboutComponent } from './components/about/about.component';
import { ViewClientInfoComponent } from './components/view-client-info/view-client-info.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { UpdateRestaurantComponent } from './components/update-restaurant/update-restaurant.component';
import { UpdateDishComponent } from './components/update-dish/update-dish.component';
import { ActivationRequestListComponent } from './components/activation-request-list/activation-request-list.component';
import { CustomerNavbarComponent } from './components/customer-navbar/customer-navbar.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { SearchComponent } from './components/search/search.component';


const appRoutes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'create-account', component: CreateAccountComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'menu', component: CustomerHomeComponent
  },
  {
    path: 'search/:keyword', component: CustomerHomeComponent
  },
  {
     path:'dashboard', component: DashboardHomeComponent,
     canActivate: [ClientGuard]
  },
  {
     path: 'restaurants', component: RestaurantListComponent,
     canActivate: [ClientGuard]
  },
  {
    path: 'dishes/add', component: AddDishComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'dishes', component: DishListComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'dishes/update/:id', component: UpdateDishComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'restaurants/update/:id', component: UpdateRestaurantComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'clients/view/:id', component: ViewClientInfoComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'about', component: AboutComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'requests', component: ActivationRequestListComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'restaurants/view/:id', component: ViewClientInfoComponent,
    canActivate: [ClientGuard]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateAccountComponent,
    LoginComponent,
    HomeNavbarComponent,
    ManagementNavBarComponent,
    DashboardHomeComponent,
    FooterComponent,
    ViewClientInfoComponent,
    RestaurantListComponent,
    DishListComponent,
    AboutComponent,
    AddDishComponent,
    UpdateRestaurantComponent,
    UpdateDishComponent,
    ActivationRequestListComponent,
    CustomerNavbarComponent,
    CustomerHomeComponent,
    SearchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
