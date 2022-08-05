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

  findSkill(id: number):Observable<Object>{
    return this.http.get(`${this.url}/find/${id}`)
  }

  createSkill(newSkill: Skill): Observable<Object>{
    return this.http.post(`${this.url}/new`, newSkill)
  }

  putSkill(skill: Skill): Observable<Object>{
    return this.http.put(`${this.url}/put`, skill)
  }

  deleteSkill(id: number): Observable<Object>{
    return this.http.delete(`${this.url}/delete/${id}`)
  }

}
