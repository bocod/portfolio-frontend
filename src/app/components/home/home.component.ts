import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/classes/profile';
import { ProfileHeaderService } from 'src/app/services/profile-header/profile-header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myProfile: Profile[] | undefined;

  constructor(private profServ: ProfileHeaderService) { }

  ngOnInit(): void {
    this.profServ.getData().subscribe( 
      {
        next: profileData => {
          this.myProfile = profileData[0].contact},
        error: error => console.error(error),
        complete: () => console.info("Profile found!")
      }
    )
  }

}
