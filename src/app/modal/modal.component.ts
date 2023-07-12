import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

regForm: FormGroup;
submitted = false

constructor(

  private rb: FormBuilder,
  private _modal : NgbModal
 
) 
{
this.regForm = this.rb.group({
  email:[null, Validators.required],
  passwrd:[null, Validators.required],
  role:['', Validators.required]
})
 
}

rolesList: any = ['Choose role:','Mechanic manager','Technical department manager']

changeRole(e) {
  console.log(e.target.value);
}

ureg(){
  this.submitted = true;

  if (this.regForm.invalid) {
    return;
  }else if(this.regForm.valid){
   this._modal.dismissAll();
  }
 
}

}
