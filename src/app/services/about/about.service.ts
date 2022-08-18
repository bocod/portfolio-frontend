import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from 'src/app/classes/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  url: string = "https://fast-scrubland-71875.herokuapp.com/about";

  constructor(private http:HttpClient) { }

  getData():Observable<About[]> 
  {
    return this.http.get<About[]>(`${this.url}/view`);
  }

  findAbout(id: number):Observable<Object>{
    return this.http.get(`${this.url}/find/${id}`)
  }

  createAbout(newAbout: About): Observable<Object>{
    return this.http.post(`${this.url}/new`, newAbout)
  }

  putAbout(about: About): Observable<Object>{
    return this.http.put(`${this.url}/put`, about)
  }

  deleteAbout(id: number): Observable<Object>{
    return this.http.delete(`${this.url}/delete/${id}`)
  }

}
