import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  constructor(
    private http: HttpClient
  ) { }

  getCarListData() {
    return this.http.get('https://localhost:5001/api/WialonFuelHistory/GetAllFuelHistory');
  }

  getCarDataById(Id: string){
    return this.http.get('https://localhost:5001/api/WialonFuelHistory/GetWialonById?cardID='+Id);
  }

}
