import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/classes/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileHeaderService {
  url:string = "http://localhost:8080/profile";

  constructor(private http:HttpClient) { }

  getData():Observable<any> 
  {
    return this.http.get<any>(`${this.url}/view`);
  }

  findProfile(id: number):Observable<Object>{
    return this.http.get(`${this.url}/find/${id}`)
  }

  createProfile(newProfile: Profile): Observable<Object>{
    return this.http.post(`${this.url}/new`, newProfile)
  }

  putProfile(profile: Profile): Observable<Object>{
    return this.http.put(`${this.url}/put`, profile)
  }

  deleteProfile(id: number): Observable<Object>{
    return this.http.delete(`${this.url}/delete/${id}`)
  }
}
