import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-tag-modal',
  templateUrl: './edit-tag-modal.component.html',
  styleUrls: ['./edit-tag-modal.component.css']
})
export class EditTagModalComponent {
  tagEditForm: FormGroup;
  submitted = false;


fillCardId(){

}



  tagEdit(){
    this.submitted = true;
  }
}
