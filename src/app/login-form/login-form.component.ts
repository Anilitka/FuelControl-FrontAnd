import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private lb: FormBuilder
  )
  {
    this.loginForm = this.lb.group({
      email:[null, Validators.required],
      passwrd:[null, Validators.required]
    })
  }

  logIn(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    else if(this.loginForm.valid){
      this.loginForm.reset();
      this.router.navigate(['home'])
    }

  }
  register(){
    this.router.navigate(['registration'])
  }
}
