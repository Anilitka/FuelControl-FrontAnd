import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelService } from '../services/fuel.service';
import { TokenService } from '../services/token.service';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-tag-modal',
  templateUrl: './edit-tag-modal.component.html',
  styleUrls: ['./edit-tag-modal.component.css']
})

export class EditTagModalComponent {
  tagEditForm: FormGroup;
  submitted = false;
  @Input() cardNumber: string;
  isCardNumberDisabled = false;
  

  constructor(
    private _modal: NgbModal,
     private formBuilder: FormBuilder,
     private http: HttpClient,
     private tokenService: TokenService,
     private fuelService: FuelService
     ){
  
    this.tagEditForm = this.formBuilder.group({
      cardNumber: [this.cardNumber],
      vehicleName : ['', Validators.required]     
    });
    
    this.tagEditForm.get('cardNumber')?.disable();

  }

sendDataToServer() {


    const body = {
        cardId : this.tagEditForm.get('cardNumber').value,
        vehicleName : this.tagEditForm.get('vehicleName').value
      };

    console.log(body)

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);
   if(body.vehicleName != null){
    this.http.patch('https://localhost:5001/api/FuelTracking/UpdateTag', body, {headers})
    
      .subscribe({
        next: (response) => {
          console.log('Response from server:', response);  
          this.tagEditForm.reset(); 
        },
        error: (error) => {
          console.log('Error tag update:', error);
          this._modal.dismissAll();
          if (error.status === 400) {
            Swal.fire({
              title: 'Please enter vehicle name.',
              icon: 'error',
              confirmButtonColor: 'rgb(255, 0, 0)',
            });
          } 
          }
        });
    
    }
 Swal.fire({ title: 'Your information is updated successfully', confirmButtonColor: 'rgb(38, 122, 38)' });
}
  
closeModal() {
 this._modal.dismissAll();
}

tagEdit(){
  this.submitted = true;
}

disableCardNumber() {
  this.isCardNumberDisabled = true;
  }
}



