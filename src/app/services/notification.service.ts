import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import {NotificationModalComponent} from "../notification-modal/notification-modal.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient, private modalService: NgbModal) {}

  openNotificationModal() {
    // Fetch the JSON file
    this.http.get('./assets/reg-requests.json', {responseType: "json"})
      .subscribe({
        next: (data: any) => {
          const modalRef = this.modalService.open(NotificationModalComponent);
          modalRef.componentInstance.data = data;
          console.log()
        },
        error: (error) =>{
          console.log('Error fetching JSON file:', error);
         }
      }
    );

  }
}
