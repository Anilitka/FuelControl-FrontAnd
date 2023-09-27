import {Component, EventEmitter, NgModule, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import {DummyData} from "../models/dummyData.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {CommonModule, DatePipe} from "@angular/common";
import { trigger, state, style, animate, transition } from '@angular/animations';
import {FuelService} from "../services/fuel.service";
import {DatePickerService} from "../services/date-picker.service";
import { TokenService } from '../services/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { ModalComponent } from '../modal/modal.component';
import { AddTagModalComponent } from '../add-tag-modal/add-tag-modal.component';
import { DeleteTagModalComponent } from '../delete-tag-modal/delete-tag-modal.component';

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
  isAdmin: boolean;
  userName: string;
  isSidebarOpen = false;
  constructor(
    private http: HttpClient,
    private fuelService: FuelService,
    private datePickerService: DatePickerService,
    private datePipe: DatePipe,
    private tokenService: TokenService,
    private _modal: NgbModal,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService
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
  encodedStartDate;
  encodedEndDate;
  allLiters: any[] = []




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
  this.checkAdmin();

  this.userService.getUsername().subscribe(username => {
    this.userName = username;
    console.log('Username:', this.userName);
  });
  this.userName = this.tokenService.getUserName();
  console.log('Username:', this.userName);

  this.getUserRole();
    this.fillCarsInfo();
    console.log('I am logging car list data:',this.carsData);
    this.getAllCount();
    this.retrieveUserInformation();


}

fillCarsInfoByDate(){


    console.log(this.startDate, this.endDate)
    this.startDateFormatted = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
    this.endDateFormatted = this.datePipe.transform(this.endDate, 'MM/dd/yyyy');
    this.encodedStartDate = encodeURIComponent(this.startDateFormatted);
    this.encodedEndDate = encodeURIComponent(this.endDateFormatted);
    console.log(this.startDateFormatted, this.endDateFormatted, this.encodedStartDate, this.encodedEndDate  )

    this.datePickerService.getCarListData(this.encodedStartDate, this.encodedEndDate, this.currentPage, this.pagesize).subscribe({
      next: (data : any[]) =>{
        this.carsData = data;
        const liters = this.carsData.map(l => l.liters)
        console.log('cars data by date:', this.carsData, liters)
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

fillCarsInfoById() {
  if (this.chosenId) {
    if (this.startDateFormatted != null && this.endDateFormatted != null) {
      this.fuelService.getCarDataById(this.chosenId, this.currentPage, this.encodedStartDate, this.encodedEndDate).subscribe({
        next: (response: any[]) => {
          this.carsDataById = response;

          const litersById = this.carsDataById.map(l => l.liters)

          console.log('by id response:', response);

          this.carsDataById.sort((a, b) => {
            const timeA = new Date(a.timeInserted).getTime();
            const timeB = new Date(b.timeInserted).getTime();
            return timeB - timeA;
          });
        },
        error: (error) => {
          console.error('Error loading cars data by id:', error);
        }
      });
    } else {
      this.fuelService.getCarDataById(this.chosenId, this.currentPage).subscribe({
        next: (response: any[]) => {
          this.carsDataById = response;
          console.log('by id response:', response);
          this.carsDataById.sort((a, b) => {
            const timeA = new Date(a.timeInserted).getTime();
            const timeB = new Date(b.timeInserted).getTime();
            return timeB - timeA;
          });
        },
        error: (error) => {
          console.error('Error loading cars data by id:', error);
        }
      });
    }
  }
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

retrieveUserInformation(): void {
  const userRole = sessionStorage.getItem('userRole');
  const userName = sessionStorage.getItem('userName');
  console.log('Retrieved user role:', userRole);
  console.log('Retrieved user name:', userName);

  // Pass the user information to the TokenService or other services/components
  this.tokenService.setUserInformation(userRole, userName);
  console.log()
}
reloadCurrentPage() {
  window.location.reload();
}

checkAdmin(){
  if(this.tokenService.getUserRole().includes("Manager")){
    this.isAdmin=true;
  }
}
getUserRole(){
  console.log('I return roles',this.tokenService.getUserRole());
  return this.tokenService.getUserRole();
}

open() {
  this._modal.open(ModalComponent);
}

openNotification() {
  this.notificationService.openNotificationModal();
}

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}
goToFuelHome(){
this.router.navigate(['home'])
}

goToFuelHistory(){
  this.router.navigate(['history'])
}
goTotags(){
  this.router.navigate(['tags'])
}
openAddTags() {
  this._modal.open(AddTagModalComponent)
}
openDeleteTags(){
  this._modal.open(DeleteTagModalComponent)
}
}
 








