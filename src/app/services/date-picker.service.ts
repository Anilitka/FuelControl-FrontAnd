import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  constructor(private http: HttpClient) { }

  getCarListData(startDate: Date, endDate: Date) {
    return this.http.get('https://localhost:5001/api/WialonFuelHistory/GetWialonByDate?startDate='+startDate+'&endDate='+endDate);
  }


}
