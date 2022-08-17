import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/classes/project';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  myProjects: any;
  projectFound: any;
  project: Project = new Project;

  constructor(private proServ: ProjectsService, private authenticatorService: AuthenticatorService, private router: Router) { }

  userLogged = this.authenticatorService.IsLogged;

  ngOnInit(): void {
    this.proServ.getData().subscribe( 
      {
        next: proData => {
          this.myProjects = proData},
        error: error => console.error(error),
        complete: () => console.info("Projects found!")
      }
    )
  }


  findProjectByID(id: number){
    this.proServ.findProject(id).subscribe(
      {
        next: proData => {
          this.projectFound = proData},
        error: error => console.error(error),
        complete: () => console.info("Project found!")
      }
    )
  }

  // ### CREATE

  submitNewProjectForm(){
    this.commitProject();
  };

  commitProject(){
    this.proServ.createProject(this.project).subscribe(
      {
        next: proData => {
          this.redirectProject();},
        error: error => console.error(error),
        complete: () => console.info("New project created")
      }
    )
  }

  // ### PUT : 

  putProjectID(id: number){
    this.findProjectByID(id);
  }

  submitPutProject(){
    this.proServ.putProject(this.projectFound).subscribe(
      {
        next: proData => {
          this.redirectProject();},
        error: error => console.error(error),
        complete: () => console.info("Project patched!")
      }
    )
  }

  // ### DELETE : 

  delProjectID(id: number){
    this.findProjectByID(id);
  }

  submitDeleteProject(){
    this.proServ.deleteProject(this.projectFound.id!).subscribe(
      {
      next: proData => {
        this.redirectProject();},
      error: error => console.error(error),
      complete: () => console.info("Project deleted!")
    })
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  redirectProject(){
    this.redirectTo("/profile");
  };
}
