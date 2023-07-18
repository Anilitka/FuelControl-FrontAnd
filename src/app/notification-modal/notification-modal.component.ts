import { Component, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../services/token.service";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent {
  @Input() data: any[]; // Rename the property to "data"

  constructor(private tokenService: TokenService, private http: HttpClient, private notifService: NotificationService) {
  }


  approveUser(user: any) {
    // Implement the logic to handle user approval here
    console.log('Approved user:', user);


    const token = this.tokenService.token;
    // Prepare the authorization header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Prepare the body for the PATCH request
    const body = { status: true }; // Replace with your desired boolean value or variable

    // Make the PATCH request
    this.http.patch('https://localhost:5001/api/Manager/UpdateByStatus?id=' + user.id , body, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('User approval successful:', response);
          // Handle the response or perform any other necessary actions
        },
        error: (error) => {
          console.log('Error approving user:', error);
          // Handle the error or display an error message
        }
      });

  }


  declineUser(user: any) {
    /// Implement the logic to handle user approval here
    console.log('Declined user:', user);


    // Prepare the authorization header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.token}`);

    // Prepare the body for the PATCH request
    const body = { status: false }; // Replace with your desired boolean value or variable

    // Make the PATCH request
    this.http.patch('https://localhost:5001/api/Manager/UpdateByStatus?id=' + user.id, body, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('User declining successful:', response);
          // Handle the response or perform any other necessary actions
        },
        error: (error) => {
          console.log('Error declining user:', error);
          // Handle the error or display an error message
        }
      });
  }
}
