import { HttpClient } from '@angular/common/http';
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
      cardNumber: [{ value: this.cardNumber, disabled: true }],
      vehicleName : ['', Validators.required]     
    });

  }

  sendDataToServer() {
    const cardID = this.tagEditForm.get('cardNumber').value.trim();
    const vehicleName = this.tagEditForm.get('vehicleName').value.trim();
    console.log('Card ID:', cardID);
    console.log('Vehicle Name:', vehicleName);
    
    const url = `https://localhost:5001/api/FuelTracking/UpdateTag?tagId=${encodeURIComponent(cardID)}&vehicleName=${encodeURIComponent(vehicleName)}`;
    
    this.http.patch(url, null)
      .subscribe(
        (response) => {
          console.log('Response from server:', response);
          this._modal.dismissAll();
          Swal.fire({ title: 'Your tag information is updated successfully', confirmButtonColor: 'rgb(38, 122, 38)' });
        },
        (error) => {
          console.error('Error:', error);
          this._modal.dismissAll();
        }
      );
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



