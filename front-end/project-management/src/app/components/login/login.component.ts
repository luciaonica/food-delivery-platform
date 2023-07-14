import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/entities/User';
import { Role } from 'src/app/entities/Role';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  user!: User;

  constructor(private accountService: AccountService,
              private authenticationService: AuthService,
              private router: Router){

  }

  ngOnInit(): void{
    localStorage.setItem('currentUser', '');
  }

  async onSubmit(){
    this.authenticationService.deauthenticateClient();
    this.authenticationService.deauthenticateDev();
    let rawuser = {
      username: this.username,
      password: this.password,
      enabled: true,
      roles: []
    };
    //add localstorage.clear when user press logout
    localStorage.setItem('currentUser', rawuser.username);
    this.accountService.loginCheck(rawuser).subscribe((user) => {
      this.user = user;
      let isDev:boolean = false;
      if(this.user.enabled == false) {
        
        this.openLoginModal();
        
      } else {
        this.username = '';
        this.password = '';
        localStorage.setItem('authKey', 'Basic ' + btoa(`${rawuser.username}:${rawuser.password}`));
        this.user.roles.forEach((role: Role) => {
          if(role.name === 'ROLE_ADMIN'){
            isDev = true;
          }
        })
        if(isDev){
          this.authenticationService.authenticateDev();
          this.authenticationService.authenticateClient();
          
          this.router.navigate(['/dashboard']);
        } else {
          
          this.authenticationService.authenticateClient();
          this.router.navigate(['/dashboard']);
        } 
      }
    })
  }

  openLoginModal() {    
    const modelDiv = document.getElementById('loginModal');
    if (modelDiv != null){
      modelDiv.style.display = 'block';
    }   
  }

  closeLoginModal() {
    const modelDiv = document.getElementById('loginModal');
    if (modelDiv != null){
      modelDiv.style.display = 'none';
    } 
  }

  redirectToLogin() {
    this.username = '';
    this.password = '';
    this.closeLoginModal();
    this.router.navigate(['/login']);
  }
}
