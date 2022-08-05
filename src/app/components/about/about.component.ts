import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { About } from 'src/app/classes/about';
import { AboutService } from 'src/app/services/about/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  myAbout: any;
  aboutFound: any;
  about: About = new About;

  constructor(private aboutServ: AboutService, private router: Router) { }

  ngOnInit(): void {
    this.aboutServ.getData().subscribe( 
      // data => {
      
      // this.myAbout = data[0];}
      {
        next: aboutData => {
          console.log(`About found: ${aboutData}:  ${JSON.stringify(aboutData)}`);
          this.myAbout = aboutData[0]},
        error: error => console.error(error),
        complete: () => console.info("About found!")
      }
    )
  }

  findAboutByID(id: number){
    this.aboutServ.findAbout(id).subscribe(
      {
        next: aboutData => {
          console.log(`About found: ${aboutData}:  ${JSON.stringify(aboutData)}`);
          this.aboutFound = aboutData},
        error: error => console.error(error),
        complete: () => console.info("About found!")
      }
    )
  }

  // ### CREATE

  submitNewAboutForm(){
    console.log(this.about);
    this.commitAbout();
  };

  commitAbout(){
    this.aboutServ.createAbout(this.about).subscribe(
      {
        next: aboutData => {
          console.log(`create-about L27: ${aboutData}`);
          this.redirectAbout();},
        error: error => console.error(error),
        complete: () => console.info("New about created")
      }
    )
  }

  // ### PUT : FindByID & Put
    // Find the about by id and save the value
  putAboutID(id: number){
    console.log(id);
    this.findAboutByID(id);
  }

  submitPutAbout(){
    this.aboutServ.putAbout(this.aboutFound).subscribe(
      {
        next: aboutData => {
          console.log(`about to put: ${aboutData}`);
          this.redirectAbout();},
        error: error => console.error(error),
        complete: () => console.info("About patched!")
      }
    )
  }

  // ### DELETE : FindByID & Delete

  // Get the id of the about to be deleted
    // Find the about by id and save the value
  delAboutID(id: number){
    console.log(id);
    this.findAboutByID(id);
  }

  // When confirming the action we call de delete fn and pass the id value
  submitDeleteAbout(){
    this.aboutServ.deleteAbout(this.aboutFound.id!).subscribe(
      {
      next: aboutData => {
        console.log(`about to delete: ${aboutData}`);
        this.redirectAbout();},
      error: error => console.error(error),
      complete: () => console.info("About deleted!")
    })
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  redirectAbout(){
    this.redirectTo("/profile");
  };
}
