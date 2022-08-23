import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Education } from 'src/app/classes/education';
import { PicFile } from 'src/app/classes/file';
import { Profile } from 'src/app/classes/profile';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { EducationService } from 'src/app/services/education/education.service';
import { ProfileHeaderService } from 'src/app/services/profile-header/profile-header.service';
import { UploadService } from 'src/app/services/upload/upload.service';

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

  // UPLOAD IMAGE VARS
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfo?: Observable<any>;
  dbImages: PicFile[] | undefined;

  
  constructor(private profServ: ProfileHeaderService, private eduServ: EducationService, private authenticatorService: AuthenticatorService, private router: Router, private uploadServ: UploadService) { }
  
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

    this.uploadServ.getFiles().subscribe( 
      {
        next: files => {
          console.log(files);

          this.dbImages = files;
          console.log(JSON.parse(JSON.stringify(this.fileInfo)));
          console.log(this.fileInfo);
        },
        error: error => console.error(error),
        complete: () => console.info("Files found!")
      }
    );

    this.fileInfo = this.uploadServ.getFiles();

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


  // FILE CRUD METHODS

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadServ.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfo = this.uploadServ.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }

  deleteFile(filename: string){
    this.uploadServ.deleteFile(filename).subscribe( res => {
      this.fileInfo = this.uploadServ.getFiles();
    })
  }

}
