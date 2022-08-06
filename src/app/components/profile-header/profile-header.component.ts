import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/classes/education';
import { Profile } from 'src/app/classes/profile';
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

  constructor(private profServ: ProfileHeaderService, private eduServ: EducationService, private router: Router) { }

  ngOnInit(): void {
    this.profServ.getData().subscribe( 
      {
        next: profileData => {
          console.log(`Profile found: ${profileData}:  ${JSON.stringify(profileData)}`);
          this.myProfile = profileData},
        error: error => console.error(error),
        complete: () => console.info("Profile found!")
      }
    )

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

  findProfileByID(id: number){
    this.profServ.findProfile(id).subscribe(
      {
        next: profileData => {
          console.log(`Profile found: ${profileData}:  ${JSON.stringify(profileData)}`);
          this.profFound = profileData},
        error: error => console.error(error),
        complete: () => console.info("Profile found!")
      }
    )
  }

  // ### CREATE

  submitNewProfileForm(){
    console.log(this.profile);
    this.commitProfile();
  };

  commitProfile(){
    this.profServ.createProfile(this.profile).subscribe(
      {
        next: profData => {
          console.log(`create-profile: ${profData}`);
          this.redirectProfile();},
        error: error => console.error(error),
        complete: () => console.info("New profile created")
      }
    )
  }

  // ### PUT : 

  putProfileID(id: number){
    console.log(id);
    this.findProfileByID(id);
  }

  submitPutProfile(){
    this.profServ.putProfile(this.profFound).subscribe(
      {
        next: profData => {
          console.log(`Profile to put: ${profData}`);
          this.redirectProfile();},
        error: error => console.error(error),
        complete: () => console.info("Profile patched!")
      }
    )
  }

  // ### DELETE : 

  delProfileID(id: number){
    console.log(id);
    this.findProfileByID(id);
  }

  submitDeleteProfile(){
    this.profServ.deleteProfile(this.profFound.id!).subscribe(
      {
      next: profData => {
        console.log(`Profile to delete: ${profData}`);
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
