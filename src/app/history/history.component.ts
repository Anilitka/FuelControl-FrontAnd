import {Component, NgModule, OnInit} from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import {DummyData} from "../models/dummyData.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {CommonModule} from "@angular/common";
import { trigger, state, style, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HistoryComponent implements OnInit{

  dummyData: DummyData[] = [];
  totalAmounts: { [carNumber: string]: number } = {};
  constructor(private http: HttpClient) {}

  

  ngOnInit(): void {
    this.http.get<DummyData[]>('./assets/dummy-data.json', { responseType: 'json' })
      .subscribe({
        next: (data: DummyData[]) => {
          this.dummyData = data;
          this.calculateTotalAmounts();
          console.log(this.totalAmounts);
        },
        error: (error) => {
          console.error('Error loading dummy data:', error);
        }
      });

    console.log(this.dummyData);

  }


  calculateTotalAmounts(): void {
    this.dummyData.forEach((item) => {
      const carNumber = item.carNumber;
      const sumOfLiters = item.data.reduce((total, data) => total + data.liters, 0);
      this.totalAmounts[carNumber] = sumOfLiters;
    });
  }

  filterTxt:any = '';

}

