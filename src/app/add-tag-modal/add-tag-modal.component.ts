import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
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
    //  private tokenService: TokenService,
    //  private fuelService: FuelService
     ){
      this.addTagForm = this.formBuilder.group({
        cardNumber: ['', Validators.required],
        VehicleNumber: ['', Validators.required],
        VehicleName: ['', Validators.required],
      });
      }
     

    tagRegistration(){
      this.submitted = true;
      if (this.addTagForm.invalid) {
        return;
    }
    }
}
