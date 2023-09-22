import { Component, ViewChild } from '@angular/core';
import { FuelService } from '../services/fuel.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tech-controll',
  templateUrl: './tech-controll.component.html',
  styleUrls: ['./tech-controll.component.css']
})
export class TechControllComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'CarNumber',
    'Amount',
    'ReceiptNumber'
  ];
  filterTxt: string = '';
  constructor(
    private fuelService: FuelService, 
  ) {}
  ngOnInit() {
    this.getDangerFines();
  }
  getDangerFines(){
    this.fuelService.getAllCarsWithNoInspection().subscribe({
      next: (data: any) => {
        this.dataSource = data;
        console.log('all data', this.dataSource);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error loading cars data by id:', error)
      }
    })
  }
  applyFilter() {
    this.dataSource.filter = this.filterTxt.trim().toLowerCase();
  }
}
