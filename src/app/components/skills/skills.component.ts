import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/services/skills/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  mySkills: any;

  constructor(private skillsData: SkillsService) { }

  ngOnInit(): void {
    this.skillsData.getData().subscribe(data => {

      this.mySkills = data;
      
    })
  }

}
