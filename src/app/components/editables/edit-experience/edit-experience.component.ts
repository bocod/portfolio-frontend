import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {

  currentJob: boolean = false;
  
  

  constructor() { }

  ngOnInit(): void {
  }

  currentJobChange(event: any) {
    this.currentJob = !this.currentJob
  }
}
