import {Component, OnInit} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  token: string = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwicm9sZSI6IlRlY2huaWNhbERlcGFydG1lbnRNYW5hZ2VyIiwibmJmIjoxNjg5MjM0MDAwLCJleHAiOjE2ODkzMjA0MDAsImlhdCI6MTY4OTIzNDAwMH0.ytYhKPitP9RCuov4gVvpsZSsgfe1FYcqbBLI5bQyqPo8QPx652Zirdmn-nYOxy_aOvBx43unufDMc4hJ_X6_iw';
  payload: any;

  ngOnInit(): void {

  }

  constructor(private _modal: NgbModal, private notificationService: NotificationService, private jwtHelper: JwtHelperService) {
    this.extractPayloadFromToken();
    this.getUserRole();
  }

  extractPayloadFromToken() {
    this.payload = this.jwtHelper.decodeToken(this.token);

  }

  getUserRole(){
    console.log('I return roles',this.payload.role);
    return this.payload.role;
  }

  open() {
    this._modal.open(ModalComponent);
  }

  openNotification() {
    this.notificationService.openNotificationModal();
  }


}
