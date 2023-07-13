import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';




@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
regForm: FormGroup;
submitted = false

constructor(
  private router: Router,
  private rb: FormBuilder,

)
{
this.regForm = this.rb.group({
  email:[null, Validators.required],
  passwrd:[null, Validators.required],
  role:['', Validators.required]
})

}
register(){
  this.submitted = true;

  if (this.regForm.invalid) {
    return;
  }else if(this.regForm.valid){
   this.router.navigate(['login'])


   Swal.fire({title:'Your registration information is sent successfully', confirmButtonColor: 'rgb(38, 122, 38)',} )

}
}
rolesList: any = ['Choose your role:','Mechanic manager','Technical department manager']

changeRole(e) {
  console.log(e.target.value);
}


}
