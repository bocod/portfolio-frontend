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
  // userLog = sessionStorage.getItem("portfolioCurrentUser");
  // userParsed = this.userLog !== null ? JSON.parse(this.userLog) : undefined;
  // userLogged = this.userParsed !== undefined ? this.userParsed.authorities[0].authority == "ROLE_ADMIN" : false;

  constructor(private authenticatorService: AuthenticatorService, private route: Router) { }

  userLogged = this.authenticatorService.IsLogged;
  
  
  ngOnInit(): void {

    console.log(this.userLogged);
    
    console.log("soy el navbar!!!");
    
  }

  logout(event: Event){
    event.preventDefault();
    sessionStorage.removeItem("portfolioCurrentUser");
    window.location.reload();
  }

}
