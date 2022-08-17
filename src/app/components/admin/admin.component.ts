import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about/about.service';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { EducationService } from 'src/app/services/education/education.service';
import { ExperienceService } from 'src/app/services/experience/experience.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { SkillsService } from 'src/app/services/skills/skills.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // Alternative way of knowing if a user is logged
  userSession = sessionStorage.getItem("portfolioCurrentUser");
  userParsed = this.userSession !== null ? JSON.parse(this.userSession) : undefined;
  isUser = this.userParsed !== undefined ? this.userParsed.authorities[0].authority == "ROLE_USER" : false;
  isAdmin = this.userParsed !== undefined ? this.userParsed.authorities[0].authority == "ROLE_ADMIN" : false;
  
  myAbout: any;
  myExperience: any;
  myEducation: any;
  mySkills: any;
  myProjects: any;

  constructor(
    private aServ: AboutService, 
    private expServ: ExperienceService, 
    private eduServ: EducationService, 
    private skServ: SkillsService, 
    private proServ: ProjectsService, 
    private authenticatorService: AuthenticatorService
    ) { }

  userLogged = this.authenticatorService.IsLogged;

  ngOnInit(): void {
    
    this.aServ.getData().subscribe(
      {
        next: aboutData => {
          this.myAbout = aboutData[0]?.about?.length},
        error: error => console.error(error),
        complete: () => console.info("Success!")
      }
    )
    
    this.expServ.getData().subscribe(
      {
        next: expData => {
          this.myExperience = expData.length},
        error: error => console.error(error),
        complete: () => console.info("Success!")
      }
    )
    
    this.eduServ.getData().subscribe(
      {
        next: eduData => {
          this.myEducation = eduData.length},
        error: error => console.error(error),
        complete: () => console.info("Success!")
      }
    )
    
    this.skServ.getData().subscribe(
      {
        next: skillsData => {
          this.mySkills = skillsData.length},
        error: error => console.error(error),
        complete: () => console.info("Success!")
      }
    )
    
    this.proServ.getData().subscribe(
      {
        next: proData => {
          this.myProjects = proData.length},
        error: error => console.error(error),
        complete: () => console.info("Success!")
      }
    )

  }

}
