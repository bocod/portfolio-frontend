import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/classes/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  url: string = "http://localhost:8080/skills";

  constructor(private http: HttpClient) { }

  getData():Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.url}/view`)
  }

  createSkill(newSkill: Skill): Observable<Object>{
    return this.http.post(`${this.url}/new`, newSkill)
  }
}
