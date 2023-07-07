import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
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

constructor(
  private router: Router,
  private formBuilder: FormBuilder
) { }

logIn(){
  if (this.loginForm )
  this.router.navigate([
    'home'
  ])
}
}
