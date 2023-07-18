import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";




@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
regForm: FormGroup;
submitted = false;

constructor(
  private router: Router,
  private rb: FormBuilder,
  private http: HttpClient,

)
{
this.regForm = this.rb.group({
  email:[null, Validators.required],
  passwrd:[null, Validators.required],
  confPassword:[null, Validators.required],
  role:['', Validators.required]
})

}
register(){
  this.submitted = true;

  if (this.regForm.invalid) {
    return;
  }else if(this.regForm.valid){
    const regData = {
      userName: this.regForm.value.email,
      password: this.regForm.value.passwrd,
      passwordConfirm: this.regForm.value.confPassword,
      role: this.regForm.value.role
    };



   this.router.navigate(['login'])
    this.http.post<any>('https://localhost:5001/api/Authorization/UserRegistration', regData).subscribe({
      next: (response) =>
      {
        console.log('I am logging reg response: ',response);
      },
      error:(error)=>
      {
        console.log('Error logging in:', error);
      }
    });
   }
    Swal.fire({title:'Your registration information is sent successfully', confirmButtonColor: 'rgb(38, 122, 38)',} )
}
rolesList: any = ['Choose your role:','User','Technical department manager']

changeRole(e) {
  console.log(e.target.value);
  if(e.target.value == 'User'){
    this.regForm.value.role = 'User'
  }else if(e.target.value == 'Technical department manager'){
    this.regForm.value.role = 'TechnicalDepartmentManager'
  }
}




}
