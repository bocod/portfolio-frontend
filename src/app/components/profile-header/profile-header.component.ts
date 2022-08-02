import { Component, OnInit } from '@angular/core';
import { ProfileHeaderService } from 'src/app/services/profile-header/profile-header.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  myProfile:any;

  constructor(private profileData: ProfileHeaderService) { }

  ngOnInit(): void {
    this.profileData.getData().subscribe( data => {
      console.log(data);
      
      console.log(`Datos personales: ${JSON.stringify(data)}`);
      
      console.log(`Nombre: ${JSON.stringify(data[0].firstname)}`);
      
      this.myProfile = data[0];
    })
  }

}
