import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.token;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCarListData() {
    const headers = this.getHeaders();
    return this.http.get('https://wialonfuelhistorybe.mygps.ge:4436/api/WialonFuelHistory/GetAllFuelHistory' , { headers });
  }

  getCarDataById(Id: string){
    const headers = this.getHeaders();
    return this.http.get('https://wialonfuelhistorybe.mygps.ge:4436/api/WialonFuelHistory/GetWialonById?cardID='+Id, { headers });
  }

}
