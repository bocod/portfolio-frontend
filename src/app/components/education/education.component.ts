import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  myEducation: any;

  constructor(private educationData: EducationService) { }

  ngOnInit(): void {
    this.educationData.getData().subscribe( data => {
      this.myEducation = data;
    })
  }

}
