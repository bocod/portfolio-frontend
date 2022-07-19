import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri = 'http://localhost:4200/api';
  token: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    this.http.post( this.uri + '/authenticate', { email: email, password: password } )
        .subscribe((resp: any) => {
          //Redirect user to profile
          this.router.navigate(['profile']);
          //Store token in localStorage
          localStorage.setItem('auth_token', resp.token);
        })
  }

  //For loginOut just delete token from localStorage
  logout() {
    localStorage.removeItem('token');
  }

  //Service for verifying existing session
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
