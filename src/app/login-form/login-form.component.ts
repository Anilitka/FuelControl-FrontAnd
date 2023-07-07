import { Component, OnInit} from '@angular/core';
<<<<<<< HEAD
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
=======
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
>>>>>>> 72bd0a75ea9f5298658851e9d4a541d52df5f4e5
import { Router } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';


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
<<<<<<< HEAD
  private formBuilder: FormBuilder
) { }

logIn(){
  if (this.loginForm )
  this.router.navigate([
    'home'
  ])
=======
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
>>>>>>> 72bd0a75ea9f5298658851e9d4a541d52df5f4e5
}
}
