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


  // getData():Observable<Skill[]>{
  //   return this.http.get<Skill[]>(`${this.url}/view`)
  // }

  // findSkill(id: number):Observable<Object>{
  //   return this.http.get(`${this.url}/find/${id}`)
  // }

  // createSkill(newSkill: Skill): Observable<Object>{
  //   return this.http.post(`${this.url}/new`, newSkill)
  // }

  // putSkill(skill: Skill): Observable<Object>{
  //   return this.http.put(`${this.url}/put`, skill)
  // }

  // deleteSkill(id: number): Observable<Object>{
  //   return this.http.delete(`${this.url}/delete/${id}`)
  // }

  // postData(data:any):Observable<any> 
  // {
  //   return this.http.post<any>(this.url+"/about/new", data);
  // }
}
