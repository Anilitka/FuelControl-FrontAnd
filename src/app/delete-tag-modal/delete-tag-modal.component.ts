import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FuelService } from '../services/fuel.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-delete-tag-modal',
  templateUrl: './delete-tag-modal.component.html',
  styleUrls: ['./delete-tag-modal.component.css']
})
export class DeleteTagModalComponent {
  constructor(
    private fuelService: FuelService,
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}
  allIdentifiedTags:any = [];
  totalItems: any;
  totalPages: any;
  pageIndex:any = 1;
  text:any = '';
  searchOpened = false;
  searchedCount:any ;
  errorMessage:any = '';
  chosenId:any;

  ngOnInit(): void {

  }

  

  previousPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
    }
    this.getAllSearchedVehicles();
  }
  
  nextPage() {
    const pages = this.searchedCount / 10;
    if (this.pageIndex < pages) {
      this.pageIndex++;
    }
    this.getAllSearchedVehicles();

  }
  returnCardId(cardId: string) {
    console.log('Received card ID:', cardId);
    this.chosenId = cardId;
    console.log('Chosen card ID:', this.chosenId);
  }
 
  getAllSearchedVehicles() {
    this.searchOpened = true;
    const inputElement = document.querySelector('.searchInput') as HTMLInputElement;;

    if (inputElement) {
      const searchText = inputElement.value;
      if (searchText.length < 5) {
        this.errorMessage = 'Please enter at least 5 characters.';
        return;
      }
   console.log(searchText)
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);

     return this.http.get(`https://mygpsadminbe.mygps.ge:4436/api/FuelTracking/GetAllSearchedVehicles?pageIndex=${this.pageIndex}&text=${searchText}`, { headers }).subscribe({
        next: (response) => {
          this.allIdentifiedTags = response;
          console.log('I am logging tag reg response: ', response);
          this.errorMessage = '';

        },
        error: (error) => {
          console.log('Error loading tags:', error);
        },
      });
    }
  }

  getSearchedCount(){
      const inputElement = document.querySelector('.searchInput') as HTMLInputElement;
      const searchText = inputElement.value; 
      return this.http.get(`https://mygpsadminbe.mygps.ge:4436/api/FuelTracking/GetCountedVehicles?text=${searchText}`).subscribe({
        next: (response) => {
          console.log(response)
          this.searchedCount = response;
        },
        error: (error) =>{
          console.log('Error loading count:', error);
        }
      })
  }

  deleteTagByCardId(tagId: string){
    if (!this.chosenId) {
      console.error('No card provided for deletion');
      return;
    }
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .delete(`https://mygpsadminbe.mygps.ge:4436/api/FuelTracking/DeleteVehicleBYcardId?tagId=${tagId}`, {
        headers,
        observe: 'response',
      })
      .subscribe({
        next:  (response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('Deleted car:', response);
  
            // Remove the car visually
            this.removeDeletedCard(tagId);
          } else {
            console.error('Failed to delete car. Status code:', response.status);
          }
        },
        error :(error) => {
          console.error('Error deleting car by id:', error);
        }
      })

  }

  removeDeletedCard(tagId: string) {
    if (!tagId) {
      console.error('No card is selected for deletion');
      return;
    }

    console.log('Deleting car with ID:', tagId);

    const index = this.allIdentifiedTags.findIndex((tag) => tag.cardId === tagId);

    if (index !== -1) {
      // Remove the tag from the array using splice
      this.allIdentifiedTags.splice(index, 1);

      if (this.searchedCount > 0) {
        this.searchedCount--;
      }

      console.log('Deleted card with cardId:', tagId);
    } else {
      console.error('Card not found in the array');
    }
}
  

}

  

