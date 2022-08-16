import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authenticatorService: AuthenticatorService, private route:Router) { 
    this.loginForm = this.formBuilder.group(
      {
        username:['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\-\.]*$"), Validators.minLength(5)]],
        password:['', [Validators.required, Validators.minLength(8)]]
      }
    )
  }

  ngOnInit(): void {
  }

  get Username()
  {
    return this.loginForm.get('username');
  }

  get Password()
  {
    return this.loginForm.get('password');
  }

  onSubmit(event:Event) 
  {
    event.preventDefault;
    this.authenticatorService.Login(this.loginForm.value).subscribe(data => {
      console.log("DATA: " + JSON.stringify(data));

      this.route.navigate(['/profile']);
      
    })
  }
}
