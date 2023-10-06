import { Component, ElementRef, Renderer2, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TokenService } from '../services/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { NotificationService } from '../services/notification.service';
import { AddTagModalComponent } from '../add-tag-modal/add-tag-modal.component';
import { DeleteTagModalComponent } from '../delete-tag-modal/delete-tag-modal.component';
import { UserService } from '../services/user.service';
import { EditTagModalComponent } from '../edit-tag-modal/edit-tag-modal.component';
import { HttpClient } from '@angular/common/http';
import { FuelService } from '../services/fuel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tags-controll',
  templateUrl: './tags-controll.component.html',
  styleUrls: ['./tags-controll.component.css']
})

export class TagsControllComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  isAdmin: boolean;
  displayedColumns: string[] = [
    'CardNumber',
    'VehicleName'
  ];
  choosenId: any;

  filterTxt: string = '';
  isSidebarOpen = false;
  userName: string;
  @ViewChild('table') table: ElementRef;

  constructor(    private tokenService: TokenService,
    private _modal: NgbModal,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
    private http: HttpClient,
    private fuelService: FuelService,
    private renderer: Renderer2
    )
    
    {

    }
  applyFilter() {
    this.dataSource.filter = this.filterTxt.trim().toLowerCase();
  }
  
  ngOnInit(): void {
    this.getUnidentifiedtags();
    this.checkAdmin();
  
    this.userService.getUsername().subscribe(username => {
      this.userName = username;
      console.log('Username:', this.userName);
    });
    this.userName = this.tokenService.getUserName();
    console.log('Username:', this.userName);

    this.retrieveUserInformation();
  
  
  }
  ngAfterViewInit() {
    const tableElement = this.renderer.selectRootElement('.matTable'); // Replace '.matTable' with your actual CSS class or element selector
    // Now you can use 'tableElement' to manipulate the DOM
  }
  getUnidentifiedtags(){
    this.fuelService.getAllTags().subscribe({
      next: (data: any) =>{
        this.dataSource = data;
        console.log('all data', this.dataSource);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error loading company:', error)
      }
    })
  }
  
  
getChoosenId(tagId: any){
  this.choosenId = tagId;
  console.log(this.choosenId)
}

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

openEditTags() {
  const modalRef = this._modal.open(EditTagModalComponent, {
    backdrop: 'static',
    keyboard: false,
    size: 'lg',
    centered: true,
    windowClass: 'custom-modal'
  });

  modalRef.componentInstance.cardNumber = this.choosenId;
  modalRef.componentInstance.isCardNumberDisabled = true; 
}


ExportTOExcel(data: any[], filename: string)
{
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, filename + '.xlsx');
  
}
exportToExcel() {
  // Prepare the data to be exported, for example, using this.dataSource
  const dataToExport = this.dataSource.data;

  // Call the ExportTOExcel function passing the data and filename
  this.ExportTOExcel(dataToExport, 'TablesSize');
}
}

