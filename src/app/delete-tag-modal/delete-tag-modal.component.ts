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
  allIdentifiedTags = [];
  totalItems: any;
  totalPages: any;
  pageIndex = 1

  ngOnInit(): void {
   this.fillAllIdentifiedTags();
  }

  fillAllIdentifiedTags() {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.get<any>(`https://localhost:5001/api/FuelTracking/GetAllIdentifiedTags?pageIndex=${this.pageIndex}`, { headers })
      .subscribe(
        (response) => {
          console.log('Response:', response);
           this.allIdentifiedTags = response;
           console.log(this.allIdentifiedTags);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  previousPage(tag: any) {
    if (tag.pageIndex > 1) {
      tag.currentPage--;
    }
  }
  
  nextPage(tag: any) {
    if (tag.currentPage < 10) {
      tag.currentPage++;
    }
  }
  
}
