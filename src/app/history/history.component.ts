import {Component, EventEmitter, NgModule, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import {DummyData} from "../models/dummyData.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {CommonModule, DatePipe} from "@angular/common";
import { trigger, state, style, animate, transition } from '@angular/animations';
import {FuelService} from "../services/fuel.service";
import {DatePickerService} from "../services/date-picker.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HistoryComponent implements OnInit{

  dummyData: DummyData[] = [];
  totalAmounts: { [carNumber: string]: number } = {};
  constructor(
    private http: HttpClient,
    private fuelService: FuelService,
    private datePickerService: DatePickerService,
    private datePipe: DatePipe,
  ) {}

  carsData: any[] = [];
  carsDataById: any[] = [];
  chosenId: string;
  sum:any;
  startDate: Date;
  endDate: Date;
  startDateFormatted : any;
  endDateFormatted : any;
  ids: number[] = [];
  id:string;
  currentPage: number = 1;
  itemsPerPage: number;
  totalItems: any;
  totalPages: any;
  @Output() cardIDClicked: EventEmitter<string> = new EventEmitter<string>();
  pageindex:number = 1;
  pagesize: number = 16;
  totalData: number;
  totalIdCount: number;
  totalDatabyId: number;
  idpagesize: number = 10;
  totalIdPages: number;
  previousCardID: string = '';

  // formatDateTime(dateTime: string): string {
  //   const date = new Date(dateTime);
  //   const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  //   const formattedTime = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
  //   return `${formattedDate} ${formattedTime}`;
  // }



returnCardID(cardID: string): void {
  if (this.chosenId === this.previousCardID) {
      this.previousCardID = '';
  }
    this.chosenId = cardID;
    this.carsData.forEach((data) => {
    if (data.cardID !== this.chosenId) {
        data.expanded = false; 
    } else {
        data.expanded = !data.expanded; 
    }
  });
}

ngOnInit(): void {

    this.fillCarsInfo();
    console.log('I am logging car list data:',this.carsData);
    this.getAllCount();
}

fillCarsInfoByDate(){


    console.log(this.startDate, this.endDate)
    this.startDateFormatted = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
    this.endDateFormatted = this.datePipe.transform(this.endDate, 'MM/dd/yyyy');
    console.log(this.startDateFormatted, this.endDateFormatted )

    this.datePickerService.getCarListData(this.startDateFormatted, this.endDateFormatted, this.currentPage, this.pagesize).subscribe({
      next: (data : any[]) =>{
        this.carsData = data;
        console.log('cars data by date:', this.carsData)
      },
      error: (error: any) =>{
        console.error('Error loading cars data by dates:', error)
      }
    })
}


fillCarsInfo(){
  this.fuelService.getCarListData(this.pageindex, this.pagesize)
      .subscribe({
      next: (data: any[]) =>{
        this.carsData = data;
        console.log('cars data :', this.carsData)
        if (data && data.length > 0) {
          this.totalItems = data.length;
          this.totalPages = Math.ceil((this.totalData / this.pagesize));
      }
      console.log('total pages', this.totalPages)
       
      },
      error: (error) => {
          console.error('Error loading cars data:', error)
      }
   

  })
}

getAllCount(){
  this.fuelService.getCount().subscribe({
    next: (data: number) => {
      this.totalData = data;
      console.log('all data', this.totalData)
    },
    error: (error) => {
      console.error('Error loading cars data by id:', error)
    }
  })
}
getCountById(){
  this.fuelService.getCountById(this.chosenId).subscribe({
    next: (data: number) => {
      this.totalDatabyId = data;
      console.log('dat by id', this.totalDatabyId)
      this.totalIdPages = (this.totalDatabyId / 10)
    },
    error: (error) => {
      console.error('Error loading cars data by id:', error)
    }
  })
}
fillCarsInfoById(){
    this.fuelService.getCarDataById(this.chosenId, this.currentPage).subscribe({
      next: (response: any[]) =>{
        this.carsDataById = response;
        console.log('by id response:', response);
        this.carsDataById.sort((a, b) => {
          const timeA = new Date(a.timeInserted).getTime();
          const timeB = new Date(b.timeInserted).getTime();
          return timeB - timeA;
        });

      },
      error: (error) => {
        console.error('Error loading cars data by id:', error)
      }
    });
}

previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fillCarsInfoById();
    }
}
  
nextPage() {
    if (this.currentPage < this.totalIdPages) {
      this.currentPage++;
      this.fillCarsInfoById();
    }
}
  
previousMainPage() {
    if (this.pageindex > 1) {
      this.pageindex--;
      this.fillCarsInfo();
    }
}
  
nextMainPage() {
    if (this.pageindex < this.totalPages  ) {
      this.pageindex++;
      this.fillCarsInfo();
    }

}

filterTxt:any = '';

}
 










