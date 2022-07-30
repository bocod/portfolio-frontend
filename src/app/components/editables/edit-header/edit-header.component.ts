import { Component, OnInit } from '@angular/core';
import { ProfileHeaderService } from 'src/app/services/profile-header.service';

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.css']
})
export class EditHeaderComponent implements OnInit {

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
