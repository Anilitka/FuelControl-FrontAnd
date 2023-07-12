import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent {
  @Input() data: any[]; // Rename the property to "data"

  approveUser(user: any) {
    // Implement the logic to handle user approval here
    console.log('Approved user:', user);
  }

  declineUser(user: any) {
    // Implement the logic to handle user decline here
    console.log('Declined user:', user);
  }
}
