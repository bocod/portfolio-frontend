import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/classes/skill';
import { SkillsService } from 'src/app/services/skills/skills.service';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css']
})
export class CreateSkillComponent implements OnInit {

  skill: Skill = new Skill();

  constructor(private skServ : SkillsService, private router: Router) { }

  ngOnInit(): void {
  }

  submitNewSkillForm(){
    console.log(`create-skill L21: submit form: ${this.skill}`);
    this.commitSkill();
  }

  commitSkill(){
    this.skServ.createSkill(this.skill).subscribe(
      {
        next: skillData => {
          console.log(`create-skill L27: ${skillData}`);
          this.redirectSkill();},
        error: error => console.error(error),
        complete: () => console.info("New skill created")
      });
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  redirectSkill(){
    this.redirectTo("/profile");
  };

}
