import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from 'src/app/classes/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  url: string = "http://localhost:8080/experience";

  constructor(private http: HttpClient) { }

  getData():Observable<any>{
    return this.http.get<any>(`${this.url}/view`)
  }


  findExperience(id: number):Observable<Object>{
    return this.http.get(`${this.url}/find/${id}`)
  }

  createExperience(newExperience: Experience): Observable<Object>{
    return this.http.post(`${this.url}/new`, newExperience)
  }

  putExperience(exp: Experience): Observable<Object>{
    return this.http.put(`${this.url}/put`, exp)
  }

  deleteExperience(id: number): Observable<Object>{
    return this.http.delete(`${this.url}/delete/${id}`)
  }
}
