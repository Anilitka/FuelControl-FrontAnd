import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSidebarOpen = false;
constructor(private router: Router){}




goToFuelHistory(){
  this.router.navigate(['history'])
}

goToDangerFines(){
  this.router.navigate(['dangerFine'])
}
}
