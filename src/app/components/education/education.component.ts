import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/classes/education';
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

  constructor(private eduServ: EducationService, private router: Router) { }

  ngOnInit(): void {
    this.eduServ.getData().subscribe( 
      {
        next: eduData => {
          console.log(`Education found: ${eduData}:  ${JSON.stringify(eduData)}`);
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
          console.log(`Education found: ${eduData}:  ${JSON.stringify(eduData)}`);
          this.eduFound = eduData},
        error: error => console.error(error),
        complete: () => console.info("Education found!")
      }
    )
  }

  // ### CREATE

  submitNewEducationForm(){
    console.log(this.education);
    this.commitEducation();
  };

  commitEducation(){
    this.eduServ.createEducation(this.education).subscribe(
      {
        next: eduData => {
          console.log(`create-education: ${eduData}`);
          this.redirectEducation();},
        error: error => console.error(error),
        complete: () => console.info("New education created")
      }
    )
  }

  // ### PUT : 

  putEducationID(id: number){
    console.log(id);
    this.findEducationByID(id);
  }

  submitPutEducation(){
    this.eduServ.putEducation(this.eduFound).subscribe(
      {
        next: eduData => {
          console.log(`Education to put: ${eduData}`);
          this.redirectEducation();},
        error: error => console.error(error),
        complete: () => console.info("Education patched!")
      }
    )
  }

  // ### DELETE : 

  delEducationID(id: number){
    console.log(id);
    this.findEducationByID(id);
  }

  submitDeleteEducation(){
    this.eduServ.deleteEducation(this.eduFound.id!).subscribe(
      {
      next: eduData => {
        console.log(`Education to delete: ${eduData}`);
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
