import { Component, ViewChild } from '@angular/core';
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
    'VehicleNumber',
    'VehicleName'
  ];
  filterTxt: string = '';
  isSidebarOpen = false;
  userName: string;

  constructor(    private tokenService: TokenService,
    private _modal: NgbModal,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService){}
  applyFilter() {
    this.dataSource.filter = this.filterTxt.trim().toLowerCase();
  }
  
  ngOnInit(): void {
    this.checkAdmin();
  
    this.userService.getUsername().subscribe(username => {
      this.userName = username;
      console.log('Username:', this.userName);
    });
    this.userName = this.tokenService.getUserName();
    console.log('Username:', this.userName);

      this.retrieveUserInformation();
  
  
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
}

