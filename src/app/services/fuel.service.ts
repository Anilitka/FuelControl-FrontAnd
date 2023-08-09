import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import { Observable } from 'rxjs';

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



getCarListData(pageindex: number, pagesize: number) {
    const headers = this.getHeaders();
    return this.http.get(`https://localhost:5001/api/WialonFuelHistory/GetAllFuelHistory?pageindex=${pageindex}&pagesize=${pagesize}` , { headers });
}

getCarDataById(Id: string, page: number){
    const headers = this.getHeaders();
   return this.http.get(`https://localhost:5001/api/WialonFuelHistory/GetWialonById?cardID=${Id}&page=${page}`, { headers });
}


getRole(){
    const headers = this.getHeaders();
    return this.http.get('https://localhost:5001/api/Roles/GetAllRoles', {headers})
}


getCount(): Observable<number>{
  const headers = this.getHeaders();
  return this.http.get<number>('https://localhost:5001/api/WialonFuelHistory/GetAllCount', {headers})
}

getCountById(Id:string){
  const headers = this.getHeaders();
  return this.http.get<number>(`https://localhost:5001/api/WialonFuelHistory/GetAllCount?cardId=${Id}`, {headers})
}

getAllCars(): Observable<any>{
  const headers = this.getHeaders();
  return this.http.get('https://localhost:5001/api/UserCar/GetAllCars', {headers})
}

 getCompanies(){
  const headers = this.getHeaders();
  return this.http.get('https://localhost:5001/api/Company/GetAllCompanies', { headers });
}
}
