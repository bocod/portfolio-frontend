import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/classes/skill';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { SkillsService } from 'src/app/services/skills/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  mySkills: Skill[] | undefined;
  skillFound: any;
  skill: Skill = new Skill;
  

  constructor(private skServ: SkillsService, private authenticatorService: AuthenticatorService, private router:Router) { }

  userLogged = this.authenticatorService.IsLogged;

  ngOnInit(): void {
    this.skServ.getData().subscribe(
      {
        next: skillsData => {
          console.log(`Skills found: ${skillsData}:  ${JSON.stringify(skillsData)}`);
          this.mySkills = skillsData},
        error: error => console.error(error),
        complete: () => console.info("Skills found!")
      }
    )
  }

  findSkillByID(id: number){
    this.skServ.findSkill(id).subscribe(
      {
        next: skillData => {
          console.log(`Skill found: ${skillData}:  ${JSON.stringify(skillData)}`);
          this.skillFound = skillData},
        error: error => console.error(error),
        complete: () => console.info("Skill found!")
      }
    )
  }
  // ### PUT : FindByID & Put
    // Find the skill by id and save the value
  putSkillID(id: number){
    console.log(id);
    this.findSkillByID(id);
  }

  submitPutSkill(){
    this.skServ.putSkill(this.skillFound).subscribe(
      {
        next: skillData => {
          console.log(`skill to put: ${skillData}`);
          this.redirectSkill();},
        error: error => console.error(error),
        complete: () => console.info("Skill patched!")
      }
    )
  }
  // ### CREATE

  submitNewSkillForm(){
    console.log(`create-skill: submit form: ${this.skill}`);
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

  // ### DELETE : FindByID & Delete

  // Get the id of the skill to be deleted
    // Find the skill by id and save the value
  delSkillID(id: number){
    console.log(id);
    this.findSkillByID(id);
  }

  // When confirming the action we call de delete fn and pass the id value
  submitDeleteSkill(){
    this.skServ.deleteSkill(this.skillFound.id!).subscribe(
      {
      next: skillData => {
        console.log(`skill to delete: ${skillData}`);
        this.redirectSkill();},
      error: error => console.error(error),
      complete: () => console.info("Skill deleted!")
    })
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  redirectSkill(){
    this.redirectTo("/profile");
  };

}
