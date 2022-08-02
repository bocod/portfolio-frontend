import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  url: string = "http://localhost:8080/skills";

  constructor(private http: HttpClient) { }

  getData():Observable<any>{
    return this.http.get<any>(`${this.url}/view`)
  }
}
