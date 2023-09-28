import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelService } from '../services/fuel.service';
import { TokenService } from '../services/token.service';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-tag-modal',
  templateUrl: './edit-tag-modal.component.html',
  styleUrls: ['./edit-tag-modal.component.css']
})
export class EditTagModalComponent {
  tagEditForm: FormGroup;
  submitted = false;
  @Input() cardNumber: string;

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

  }

  closeModal() {
   this._modal.dismissAll();
  }

  tagEdit(){
    this.submitted = true;
  }
}
