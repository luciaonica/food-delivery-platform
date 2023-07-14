import { Injectable } from '@angular/core';

//got some help from https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedClient: boolean = false;
  private authenticatedDev: boolean = false;

  constructor() { }

  isAuthenticatedClient(): boolean {
    return this.authenticatedClient;
  }
  isAuthenticatedDev(): boolean {
    return this.authenticatedDev;
  }

  authenticateDev(): void {
    this.authenticatedDev = true;
  }
  authenticateClient(): void {
    this.authenticatedClient = true;
  }
  deauthenticateDev(): void {
    this.authenticatedDev = false;
  }
  deauthenticateClient(): void {
    this.authenticatedClient = false;
  }
}
