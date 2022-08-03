import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  myAbout: any;

  constructor(private aboutData: AboutService) { }

  ngOnInit(): void {
    this.aboutData.getData().subscribe( data => {
      
      this.myAbout = data[0]
    })
  }

}
