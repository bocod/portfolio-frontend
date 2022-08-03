import { Component, OnInit } from '@angular/core';
import { ExperienceService } from 'src/app/services/experience/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  myExperience: any;
  parseDate = Date.parse;


  calcElapsed = (end:any, start:any) => {
    if (end != null) {
      let diff = this.parseDate(end) - this.parseDate(start);
      let years = Math.trunc((diff/86400000)/365);
      let rest = diff/86400000/365 - years;
      let months = rest > 0 ? Math.trunc((rest*365)/30.5) : 0;
      let elapsed = years > 0 ? `${years} years ${months} months` : `${months} months`;
      return elapsed;
    } else  {
      let diff = Date.now() - this.parseDate(start);
      let years = Math.trunc((diff/86400000)/365);
      let rest = diff/86400000/365 - years;
      let months = rest > 0 ? Math.trunc((rest*365)/30.5) : 0;
      let elapsed = years > 0 ? `${years} years ${months} months` : `${months} months`;
      return elapsed;
    }
  };

  constructor(private experienceData: ExperienceService) { }

  ngOnInit(): void {
    this.experienceData.getData().subscribe( data => {
      this.myExperience = data;
    })
  }

}
