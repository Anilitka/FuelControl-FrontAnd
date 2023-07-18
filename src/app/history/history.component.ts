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

  @Output() cardIDClicked: EventEmitter<string> = new EventEmitter<string>();


  // formatDateTime(dateTime: string): string {
  //   const date = new Date(dateTime);
  //   const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  //   const formattedTime = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
  //   return `${formattedDate} ${formattedTime}`;
  // }

  returnCardID(cardID: string): void {
    this.cardIDClicked.emit(cardID);
    console.log(cardID);
    this.chosenId = cardID;
  }


  ngOnInit(): void {

    this.fillCarsInfo();
    console.log('I am logging car list data:',this.carsData);

  }

  fillCarsInfoByDate(){


    console.log(this.startDate, this.endDate)
    this.startDateFormatted = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
    this.endDateFormatted = this.datePipe.transform(this.endDate, 'MM/dd/yyyy');
    console.log(this.startDateFormatted, this.endDateFormatted )

    this.datePickerService.getCarListData(this.startDateFormatted, this.endDateFormatted).subscribe({
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
    this.fuelService.getCarListData()
      .subscribe({
      next: (data: any[]) =>{
        this.carsData = data;
        console.log('cars data :', this.carsData)
      },
        error: (error) => {
          console.error('Error loading cars data:', error)
        }


    })
  }

  fillCarsInfoById(){
    this.fuelService.getCarDataById(this.chosenId).subscribe({
      next: (response: any[]) =>{
        this.carsDataById = response;
        console.log('by id response:', response);
        this.carsDataById.sort((a, b) => {
          const timeA = new Date(a.timeInserted).getTime();
          const timeB = new Date(b.timeInserted).getTime();
          return timeB - timeA;
        });

        this.calculateTotalAmounts(this.carsDataById);
      },
      error: (error) => {
        console.error('Error loading cars data by id:', error)
      }
    });
  }

  calculateTotalAmounts(data: any[]): void {
    this.carsDataById.forEach((item) => {
      const carNumber = item.carNumber;
      const sumOfLiters = data.reduce((total, dataId) => total + dataId.liters, 0);

      this.sum = sumOfLiters;

      console.log('I log sum of liters:',sumOfLiters);
      this.totalAmounts[carNumber] = sumOfLiters;
    });
  }

  filterTxt:any = '';

}

