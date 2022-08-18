import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/classes/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url: string = "https://fast-scrubland-71875.herokuapp.com/projects";

  constructor(private http: HttpClient) { }

  getData():Observable<any>{
    return this.http.get<any>(`${this.url}/view`)
  }

  findProject(id: number):Observable<Object>{
    return this.http.get(`${this.url}/find/${id}`)
  }

  createProject(newProject: Project): Observable<Object>{
    return this.http.post(`${this.url}/new`, newProject)
  }

  putProject(project: Project): Observable<Object>{
    return this.http.put(`${this.url}/put`, project)
  }

  deleteProject(id: number): Observable<Object>{
    return this.http.delete(`${this.url}/delete/${id}`)
  }

}
