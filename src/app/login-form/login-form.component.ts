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

constructor(
  private router: Router,
  private lb: FormBuilder
) 
{
this.loginForm = this.lb.group({
  email:['', Validators.required],
  passwrd:['', Validators.required]
})
}

logIn(){
  if(this.loginForm.valid){
    this.loginForm.reset();
    this.router.navigate([
    'Home'
  ])  
  }

}
}
