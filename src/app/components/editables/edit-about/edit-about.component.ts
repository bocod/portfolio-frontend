import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AboutService } from 'src/app/services/edit/about.service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {

  aboutForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: Router, private aboutService: AboutService) {

    this.aboutForm = this.formBuilder.group(
      {
        description: ['', [Validators.maxLength(255)]]
      }
    )
  }

  ngOnInit(): void {
  }

  get Description () {
    console.log('GETTER: '+this.aboutForm.get('about'));
    
    return this.aboutForm.get('about');
  }

  onSubmit(event: Event){
    event.preventDefault;

    const aboutDesc = JSON.stringify(this.aboutForm);

    console.log(aboutDesc);
    

    // return this.aboutService.postData(aboutDesc);
    
  }
}
