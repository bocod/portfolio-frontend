import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experience } from 'src/app/classes/experience';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { ExperienceService } from 'src/app/services/experience/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  myExperience: Experience[] | undefined;
  parseDate = Date.parse;

  expFound: any;
  experience: Experience = new Experience;

  calcElapsed = (end:any, start:any) => {
    if (end != null) {
      let diff = this.parseDate(end) - this.parseDate(start);
      let years = Math.trunc((diff/86400000)/365);
      let rest = diff/86400000/365 - years;
      let months = rest > 0 ? Math.trunc((rest*365)/30.5) : 0;
      let elapsed = years > 0 ? `${years} years ${months} months` : `${months} months`;
      return elapsed;
    } else  {
      let diff = Date.now() - this.parseDate(start);
      let years = Math.trunc((diff/86400000)/365);
      let rest = diff/86400000/365 - years;
      let months = rest > 0 ? Math.trunc((rest*365)/30.5) : 0;
      let elapsed = years > 0 ? `${years} years ${months} months` : `${months} months`;
      return elapsed;
    }
  };

  constructor(private expServ: ExperienceService, private authenticatorService: AuthenticatorService, private router: Router) { }

  userLogged = this.authenticatorService.IsLogged;

  ngOnInit(): void {
    this.expServ.getData().subscribe( 
      {
        next: expData => {
          console.log(`Experience found: ${expData}:  ${JSON.stringify(expData)}`);
          this.myExperience = expData},
        error: error => console.error(error),
        complete: () => console.info("Experience found!")
      }
    )
  }


  findExperienceByID(id: number){
    this.expServ.findExperience(id).subscribe(
      {
        next: expData => {
          console.log(`Experience found: ${expData}:  ${JSON.stringify(expData)}`);
          this.expFound = expData},
        error: error => console.error(error),
        complete: () => console.info("Experience found!")
      }
    )
  }

  // ### CREATE

  submitNewExperienceForm(){
    console.log(this.experience);
    this.commitExperience();
  };

  commitExperience(){
    this.expServ.createExperience(this.experience).subscribe(
      {
        next: expData => {
          console.log(`create-experience: ${expData}`);
          this.redirectExperience();},
        error: error => console.error(error),
        complete: () => console.info("New experience created")
      }
    )
  }

  // ### PUT : 

  putExperienceID(id: number){
    console.log(id);
    this.findExperienceByID(id);
  }

  submitPutExperience(){
    this.expServ.putExperience(this.expFound).subscribe(
      {
        next: expData => {
          console.log(`Experience to put: ${expData}`);
          this.redirectExperience();},
        error: error => console.error(error),
        complete: () => console.info("Experience patched!")
      }
    )
  }

  // ### DELETE : 

  delExperienceID(id: number){
    console.log(id);
    this.findExperienceByID(id);
  }

  submitDeleteExperience(){
    this.expServ.deleteExperience(this.expFound.id!).subscribe(
      {
      next: expData => {
        console.log(`Experience to delete: ${expData}`);
        this.redirectExperience();},
      error: error => console.error(error),
      complete: () => console.info("Experience deleted!")
    })
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  redirectExperience(){
    this.redirectTo("/profile");
  }

}
