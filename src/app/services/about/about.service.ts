import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  url: string = "http://localhost:8080/about";

  constructor(private http:HttpClient) { }

  getData():Observable<any> 
  {
    return this.http.get<any>(`${this.url}/view`);
  }

  // postData(data:any):Observable<any> 
  // {
  //   return this.http.post<any>(this.url+"/about/new", data);
  // }
}
