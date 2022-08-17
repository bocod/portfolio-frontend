import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/classes/education';
import { Profile } from 'src/app/classes/profile';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { EducationService } from 'src/app/services/education/education.service';
import { ProfileHeaderService } from 'src/app/services/profile-header/profile-header.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  myProfile: Profile[] | undefined;
  myEducation: Education[] | undefined;

  profFound: any;
  profile: Profile = new Profile;

  
  constructor(private profServ: ProfileHeaderService, private eduServ: EducationService, private authenticatorService: AuthenticatorService, private router: Router) { }
  
  userLogged = this.authenticatorService.IsLogged;

  scrollTo(fragment:any){
    const element = document.querySelector(`#${fragment}`);
    element?.scrollIntoView();
  }

  ngOnInit(): void {
    this.profServ.getData().subscribe( 
      {
        next: profileData => {
          this.myProfile = profileData},
        error: error => console.error(error),
        complete: () => console.info("Profile found!")
      }
    )

    this.eduServ.getData().subscribe( 
      {
        next: eduData => {
          this.myEducation = eduData},
        error: error => console.error(error),
        complete: () => console.info("Education found!")
      }
    )
    
  }

  findProfileByID(id: number){
    this.profServ.findProfile(id).subscribe(
      {
        next: profileData => {
          this.profFound = profileData},
        error: error => console.error(error),
        complete: () => console.info("Profile found!")
      }
    )
  }

  // ### CREATE

  submitNewProfileForm(){
    this.commitProfile();
  };

  commitProfile(){
    this.profServ.createProfile(this.profile).subscribe(
      {
        next: profData => {
          this.redirectProfile();},
        error: error => console.error(error),
        complete: () => console.info("New profile created")
      }
    )
  }

  // ### PUT : 

  putProfileID(id: number){
    this.findProfileByID(id);
  }

  submitPutProfile(){
    this.profServ.putProfile(this.profFound).subscribe(
      {
        next: profData => {
          this.redirectProfile();},
        error: error => console.error(error),
        complete: () => console.info("Profile patched!")
      }
    )
  }

  // ### DELETE : 

  delProfileID(id: number){
    this.findProfileByID(id);
  }

  submitDeleteProfile(){
    this.profServ.deleteProfile(this.profFound.id!).subscribe(
      {
      next: profData => {
        this.redirectProfile();},
      error: error => console.error(error),
      complete: () => console.info("Profile deleted!")
    })
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  redirectProfile(){
    this.redirectTo("/profile");
  }


}
