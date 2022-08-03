import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/classes/skill';
import { SkillsService } from 'src/app/services/skills/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  mySkills: Skill[] | undefined;
  

  constructor(private skillsData: SkillsService) { }

  ngOnInit(): void {
    this.skillsData.getData().subscribe(data => {

      this.mySkills = data;
      console.log(this.mySkills);
      
      
    })
  }

}
