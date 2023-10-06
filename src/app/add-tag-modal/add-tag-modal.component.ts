import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-add-tag-modal',
  templateUrl: './add-tag-modal.component.html',
  styleUrls: ['./add-tag-modal.component.css']
})
export class AddTagModalComponent {
  addTagForm: FormGroup;
  submitted = false;

  constructor(
    private _modal : NgbModal,
     private formBuilder: FormBuilder,
     private http: HttpClient,
     private tokenService: TokenService,
    //  private fuelService: FuelService
     ){
      this.addTagForm = this.formBuilder.group({
        cardNumber: ['', Validators.required],
        VehicleName: ['', Validators.required],
      });
      }
     

tagRegistration(){
  this.submitted = true;

  if (this.addTagForm.invalid) {
    return;
  }else if(this.addTagForm.valid){
      const body = {
        cardId : this.addTagForm.get('cardNumber').value,
        vehicleName : this.addTagForm.get('VehicleName').value
      };
    console.log(body)


    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);

    this.http.post('https://mygpsadminbe.mygps.ge:4436/api/FuelTracking/CreateTag', body, { headers } ).subscribe({
      next: (response) => {
        console.log('I am logging car reg response: ', response);
        this.addTagForm.reset(); 
      },
      error: (error) => {
        console.log('Error car reg :', error);
        this._modal.dismissAll();
      
      },
      
    })
  

  this._modal.dismissAll();
  Swal.fire({ title: 'Tag is registered successfully!', confirmButtonColor: 'rgb(38, 122, 38)' });
  }

}
    
}

