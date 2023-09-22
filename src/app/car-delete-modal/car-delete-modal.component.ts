import { Component, OnInit } from '@angular/core';
import { FuelService } from '../services/fuel.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenService } from '../services/token.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-car-delete-modal',
  templateUrl: './car-delete-modal.component.html',
  styleUrls: ['./car-delete-modal.component.css'],
})
export class CarDeleteModalComponent implements OnInit {

  companyName: any[] = [];
  currentPage: number = 1; 
  carsPerPage: number = 5; 
  totalIdPages: number;
  chosenId: string;
  showCarList: { [key: string]: boolean } = {};
 companyId: any;


  constructor(
    private fuelService: FuelService,
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.fillAllCompaniesWithCars();
  }

  returnCarId(carId: string) {
    console.log('Received car ID:', carId);
    this.chosenId = carId;
    console.log('Chosen car ID:', this.chosenId);
  }

  

  fillAllCompaniesWithCars() {
    this.fuelService.getAllCompaniesWithCars().subscribe({
      next: (data: any[]) => {
        this.companyName = data.map(company => ({
          ...company,
          userCarInformationDto: company.userCarInformationDto,
          currentPage: 1, 
        }));
  
        console.log('all data of company with cars', this.companyName);
      },
      error: (error) => {
        console.error('Error loading companies with cars', error);
      },
    });
  }
  
  deleteCarById(id: string) {
    if (!this.chosenId) {
      console.error('No car ID provided for deletion');
      return;
    }
  
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http
      .delete(`https://mygpsadminbe.mygps.ge:4436/api/UserCar/DeleteCarById?id=${id}`, {
        headers,
        observe: 'response',
      })
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('Deleted car:', response);
  
            // Remove the car visually
            this.removeDeletedCar(id);
          } else {
            console.error('Failed to delete car. Status code:', response.status);
          }
        },
        (error) => {
          console.error('Error deleting car by id:', error);
        }
      );
  }
  
  removeDeletedCar(id: string) {
    if (!this.chosenId) {
      console.error('No car ID selected for deletion');
      return;
    }
  
    console.log('Deleting car with ID:', this.chosenId);
  
    // Find company by car id
    const companyWithCar = this.companyName.find((company) =>
      company.userCarInformationDto.some((car) => car.carId === id)
    );
  
    if (!companyWithCar) {
      console.error('Car with ID', id, 'not found in the company data');
      return;
    }
  
    // Remove car 
    const carIndex = companyWithCar.userCarInformationDto.findIndex(
      (car) => car.carId === id
    );
  
    if (carIndex !== -1) {
      companyWithCar.userCarInformationDto.splice(carIndex, 1);
    }
  
    // Reset the chosenId
    this.chosenId = null;
  }
  
  getPaginatedCars(cars: any[], currentPage: number): any[] {
    const startIndex = (currentPage - 1) * this.carsPerPage;
    const endIndex = startIndex + this.carsPerPage;
    return cars.slice(startIndex, endIndex);
  }
  
  previousPage(company: any) {
    if (company.currentPage > 1) {
      company.currentPage--;
    }
  }
  
  nextPage(company: any) {
    const totalPages = Math.ceil(company.userCarInformationDto.length / this.carsPerPage);
    if (company.currentPage < totalPages) {
      company.currentPage++;
    }
  }
  
  toggleCarList(company: any) {
    const companyName = company.companyName;
    this.showCarList[companyName] = !this.showCarList[companyName];
  }
  
}