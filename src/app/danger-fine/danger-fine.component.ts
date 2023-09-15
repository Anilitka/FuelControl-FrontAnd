import { Component, ViewChild } from '@angular/core';
import { FuelService } from '../services/fuel.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-danger-fine',
  templateUrl: './danger-fine.component.html',
  styleUrls: ['./danger-fine.component.css']
})
export class DangerFineComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'CarNumber',
    'Amount',
    'ReceiptNumber'
  ];

  constructor(
    private fuelService: FuelService, 
  ) {}
  ngOnInit() {
    this.getDangerFines();
  }
  getDangerFines(){
    this.fuelService.getAllDangerFines().subscribe({
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
}
