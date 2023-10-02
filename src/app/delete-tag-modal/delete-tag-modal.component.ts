import { HttpClient, HttpHeaders } from '@angular/common/http';
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

     return this.http.get(`https://localhost:5001/api/FuelTracking/GetAllSearchedVehicles?pageIndex=${this.pageIndex}&text=${searchText}`, { headers }).subscribe({
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
      return this.http.get(`https://localhost:5001/api/FuelTracking/GetCountedVehicles?text=${searchText}`).subscribe({
        next: (response) => {
          console.log(response)
          this.searchedCount = response;
        },
        error: (error) =>{
          console.log('Error loading count:', error);
        }
      })
    }


  
  

  }

  

