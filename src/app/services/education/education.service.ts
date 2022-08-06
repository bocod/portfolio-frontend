import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from 'src/app/classes/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  url: string = "http://localhost:8080/education";

  constructor(private http: HttpClient) { }

  getData():Observable<any>{
    return this.http.get<any>(`${this.url}/view`)
  }

  findEducation(id: number):Observable<Object>{
    return this.http.get(`${this.url}/find/${id}`)
  }

  createEducation(newEducation: Education): Observable<Object>{
    return this.http.post(`${this.url}/new`, newEducation)
  }

  putEducation(edu: Education): Observable<Object>{
    return this.http.put(`${this.url}/put`, edu)
  }

  deleteEducation(id: number): Observable<Object>{
    return this.http.delete(`${this.url}/delete/${id}`)
  }
}
