import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import {NotificationModalComponent} from "../notification-modal/notification-modal.component";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient, private modalService: NgbModal,private tokenService: TokenService) {}

  openNotificationModal() {

    // Prepare the authorization header
    const token = this.tokenService.token; // Replace with your actual bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Add cache-busting parameter
    const timestamp = new Date().getTime();
    const url = `https://wialonfuelhistorybe.mygps.ge:4436/api/Manager/GetFilteredUsers?timestamp=${timestamp}`;

    // Fetch the JSON file
    this.http.get(url, {headers, responseType: "json"})
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
