import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private _modal: NgbModal, private notificationService: NotificationService)
  {}


  open(){
   this._modal.open(ModalComponent);
  }

  openNotification() {
    this.notificationService.openNotificationModal();
  }
}
