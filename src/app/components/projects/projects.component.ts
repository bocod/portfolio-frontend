import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  myProjects: any;

  constructor(private projectsData: ProjectsService) { }

  ngOnInit(): void {
    this.projectsData.getData().subscribe( data => {
      this.myProjects = data;
    })
  }

}
