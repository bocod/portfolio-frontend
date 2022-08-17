import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthenticatorService } from 'src/app/services/authenticator.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  // Alternative way of knowing if a user is logged
  userSession = sessionStorage.getItem("portfolioCurrentUser");
  userParsed = this.userSession !== null ? JSON.parse(this.userSession) : undefined;
  isUser = this.userParsed !== undefined ? this.userParsed.authorities[0].authority == "ROLE_USER" : false;
  isAdmin = this.userParsed !== undefined ? this.userParsed.authorities[0].authority == "ROLE_ADMIN" : false;

  constructor(private authenticatorService: AuthenticatorService, private route: Router) { }

  userLogged = this.authenticatorService.IsLogged;
  
  
  ngOnInit(): void { }

  logout(event: Event){
    event.preventDefault();
    sessionStorage.removeItem("portfolioCurrentUser");
    window.location.reload();
  }

}
