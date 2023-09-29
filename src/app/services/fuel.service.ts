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
  const token = this.tokenService.getToken();;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}



getCarListData(pageindex: number, pagesize: number) {
    const headers = this.getHeaders();
    return this.http.get(`https://localhost:5001/api/FuelTracking/GetAllFuelHistory?pageindex=${pageindex}&pagesize=${pagesize}` , { headers });
}

getCarDataById(Id: string, page: number, startDate?: string, endDate?: string) {
  const headers = this.getHeaders();
  let url = `https://localhost:5001/api/FuelTracking/GetWialonById?cardID=${Id}&page=${page}`;

  if (startDate && endDate) {
    url += `&startDate=${startDate}&endDate=${endDate}`;
  }

  return this.http.get(url, { headers });
}


// getAllLitersById(Id: string){
//   const headers = this.getHeaders();
//   return this.http.get(`https://localhost:5001/api/WialonFuelHistory/GetLiterById?cardId=${Id}`, {headers})
// }

getRole(){
    const headers = this.getHeaders();
    return this.http.get('https://localhost:5001/api/Roles/GetAllRoles', {headers})
}


getCount(): Observable<number>{
  const headers = this.getHeaders();
  return this.http.get<number>('https://localhost:5001/api/FuelTracking/GetAllCount', {headers})
}

getCountById(Id:string){
  const headers = this.getHeaders();
  return this.http.get<number>(`https://localhost:5001/api/FuelTracking/GetAllCount?cardId=${Id}`, {headers})
}

getAllCars(): Observable<any>{
  const headers = this.getHeaders();
  return this.http.get('https://localhost:5001/api/UserCar/GetAllCars', {headers})
}

 getCompanies(){
  const headers = this.getHeaders();
  return this.http.get('https://localhost:5001/api/Company/GetAllCompanies', { headers });
}
getAllCompaniesWithCars(){
  const headers = this.getHeaders();
  return this.http.get('https://localhost:5001/api/Company/GetAllCompaniesWithCars', { headers });
}
getAllDangerFines(){
  const headers = this.getHeaders();
  return this.http.get('https://localhost:5001/api/Fine/GetAllDangerFine', { headers });
}
getAllCarsWithNoInspection(){
  const headers = this.getHeaders();
  return this.http.get('https://localhost:5001/api/TechCar/GetAllCarsWithNoInspection', { headers });
}

getAllTags(){
  const headers = this.getHeaders();
  return this.http.get('https://localhost:5001/api/FuelTracking/GetAllUnidentifiedTags', { headers });
}
}

