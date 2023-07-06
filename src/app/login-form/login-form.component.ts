import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
loginForm: FormGroup;

constructor(
  private router: Router
) { }

logIn(){
  this.router.navigate([
    'Home'
  ])
}
}
