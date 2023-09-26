import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tags-controll',
  templateUrl: './tags-controll.component.html',
  styleUrls: ['./tags-controll.component.css']
})
export class TagsControllComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'CardNumber',
    'VehicleNumber',
    'VehicleName'
  ];
  filterTxt: string = '';
  applyFilter() {
    this.dataSource.filter = this.filterTxt.trim().toLowerCase();
  }
  
}
