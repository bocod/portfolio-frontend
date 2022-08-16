import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  url = "http://localhost:8080/auth/login";
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http:HttpClient) { 
    console.log("Auth service running");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("portfolioCurrentUser") || '{}'));
  }

  Login(credentials:any):Observable<any>
  {
    return this.http.post(this.url, credentials).pipe(map(data=>{
      sessionStorage.setItem("portfolioCurrentUser", JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))
  }

  get AuthUser()
  {
    return this.currentUserSubject.value;
  }

  get IsLogged() {
    return Object.keys(this.currentUserSubject.value).length === 0 ? false : true;
  }
}
