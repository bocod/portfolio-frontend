import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/classes/education';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { EducationService } from 'src/app/services/education/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  myEducation: Education[] | undefined;
  eduFound: any;
  education: Education = new Education;

  constructor(private eduServ: EducationService, private authenticatorService: AuthenticatorService, private router: Router) { }

  userLogged = this.authenticatorService.IsLogged;

  ngOnInit(): void {
    this.eduServ.getData().subscribe( 
      {
        next: eduData => {
          this.myEducation = eduData},
        error: error => console.error(error),
        complete: () => console.info("Education found!")
      }
    )
  }


  findEducationByID(id: number){
    this.eduServ.findEducation(id).subscribe(
      {
        next: eduData => {
          this.eduFound = eduData},
        error: error => console.error(error),
        complete: () => console.info("Education found!")
      }
    )
  }

  // ### CREATE

  submitNewEducationForm(){
    this.commitEducation();
  };

  commitEducation(){
    this.eduServ.createEducation(this.education).subscribe(
      {
        next: eduData => {
          this.redirectEducation();},
        error: error => console.error(error),
        complete: () => console.info("New education created")
      }
    )
  }

  // ### PUT : 

  putEducationID(id: number){
    this.findEducationByID(id);
  }

  submitPutEducation(){
    this.eduServ.putEducation(this.eduFound).subscribe(
      {
        next: eduData => {
          this.redirectEducation();},
        error: error => console.error(error),
        complete: () => console.info("Education patched!")
      }
    )
  }

  // ### DELETE : 

  delEducationID(id: number){
    this.findEducationByID(id);
  }

  submitDeleteEducation(){
    this.eduServ.deleteEducation(this.eduFound.id!).subscribe(
      {
      next: eduData => {
        this.redirectEducation();},
      error: error => console.error(error),
      complete: () => console.info("Education deleted!")
    })
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  redirectEducation(){
    this.redirectTo("/profile");
  }

}
