import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  userLog = sessionStorage.getItem("portfolioCurrentUser");
  userParsed = this.userLog !== null ? JSON.parse(this.userLog) : undefined;
  userLogged = this.userParsed !== undefined ? this.userParsed.authorities[0].authority == "ROLE_ADMIN" : false;

  constructor(private route: Router) { }

  ngOnInit(): void {
    
  }

  logout(event: Event){
    event.preventDefault();
    sessionStorage.removeItem("portfolioCurrentUser");
    this.route.navigate(["/profile"]);
  }

}
