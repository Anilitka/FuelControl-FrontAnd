import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private _modal: NgbModal) 
  {}


  open(){
   this._modal.open(ModalComponent);
  }
}
