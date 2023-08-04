import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  constructor(private http: HttpClient) { }

  getCarListData(startDate: Date, endDate: Date, pageindex: number, pageSize: number) {
    return this.http.get(`https://wialonfuelhistorybe.mygps.ge:4436/api/WialonFuelHistory/GetWialonByDate?startDate=${startDate}&${endDate}=&pageindex=${pageindex}&pageSize=${pageSize}`);
  }


}
