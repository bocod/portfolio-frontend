import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education/education.service';
import { ProfileHeaderService } from 'src/app/services/profile-header/profile-header.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  myProfile:any;
  myEducation: any;

  constructor(private profileData: ProfileHeaderService, private educationData: EducationService) { }

  ngOnInit(): void {
    this.profileData.getData().subscribe( data => {      
      this.myProfile = data[0];
    })

    this.educationData.getData().subscribe( data => {
      this.myEducation = data
    })
    
  }

}
