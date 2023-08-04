import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-car-reg-modal',
  templateUrl: './car-reg-modal.component.html',
  styleUrls: ['./car-reg-modal.component.css']
})
export class CarRegModalComponent {
  carRegForm: FormGroup;
  submitted = false
  
constructor(
  private _modal : NgbModal,
   private formBuilder: FormBuilder,
   private http: HttpClient,
   private tokenService: TokenService
   ){

  this.carRegForm = this.formBuilder.group({
    carNumber: ['', Validators.required],      
    techPass: ['', Validators.required],       
  });
}


carReg(){
  this.submitted = true;

  if (this.carRegForm.invalid) {
    return;
  }else if(this.carRegForm.valid){
    const carRegData = {
    carNumber: this.carRegForm.value.carNumber,
    techPassportId: this.carRegForm.value.techPass
    };
    console.log(carRegData)
    const token = this.tokenService.token;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.token}`);

    this.http.post('https://wialonfuelhistorybe.mygps.ge:4436/api/UserCar/AddNewCar', carRegData, { headers } ).subscribe({
      next: (response) => {
        console.log('I am logging car reg response: ', response);
        this.carRegForm.reset(); 
      },
      error: (error) => {
        console.log('Error car reg :', error);
      }
    })

  this._modal.dismissAll();
  Swal.fire({ title: 'Your car registration information is sent successfully', confirmButtonColor: 'rgb(38, 122, 38)' });
  }

}
}
