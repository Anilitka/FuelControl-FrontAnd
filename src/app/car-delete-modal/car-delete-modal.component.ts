import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuelService } from '../services/fuel.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-car-delete-modal',
  templateUrl: './car-delete-modal.component.html',
  styleUrls: ['./car-delete-modal.component.css']
})
export class CarDeleteModalComponent {

  allCars: any[] = [];
  chosenId: string;
  @Output() carIDClicked: EventEmitter<string> = new EventEmitter<string>();
  
constructor(
  private _modal : NgbModal,
  private fuelService: FuelService,
  private http: HttpClient,
  )
{

}

ngOnInit(): void {
this.fillAllCars()

}
returnCarId(Id: string){
this.chosenId = Id;
}

fillAllCars(){
  this.fuelService.getAllCars().subscribe({
    next: (data: any[]) => {
      this.allCars = data;
      console.log('all data car reg', this.allCars)
    },
    error: (error) => {
      console.error('Error loading cars data by id:', error)
    }
  })
}

deleteCarById(id: string){
  id = this.chosenId
  console.log(id)
  this.http.delete(`https://localhost:5001/api/UserCar/DeleteCar?id=${id}`).subscribe({
    next: (response) => {
      
      console.log('all data car reg', response);
      this.fillAllCars();
      this.allCars = this.allCars.filter(u => u.id !== this.chosenId)
    },
    error: (error) => {
      console.error('Error loading cars data by id:', error)
    }
  })
}
}
