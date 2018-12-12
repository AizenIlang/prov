import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource, MatSort, MatPaginator,MatTable } from '@angular/material';
import { HospitalService } from '../service/hospital.service';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-userlobby',
  templateUrl: './userlobby.component.html',
  styleUrls: ['./userlobby.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserlobbyComponent implements OnInit{

  dataSource = [];
  dataHospital : any;
  HospitalList : any;
  columnsToDisplay = ['Name', 'Address', 'Email', 'ContactNumber','Rating'];
  expandedElement: PeriodicElement | null;


  lat: number = 51.678418;
  lng: number = 7.809007;
  langalngalnga;

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(){
    this.loadHospital();

  }

  constructor(private hospitalService : HospitalService){

  }

  applyFilter(filterValue: string) {
    this.dataHospital.filter = filterValue.trim().toLowerCase();

    if (this.dataHospital.paginator) {
      this.dataHospital.paginator.firstPage();
    }
  }

  async loadHospital(){
    var hospitalList= [];

    this.dataHospital = new MatTableDataSource(hospitalList);   
    this.HospitalList =  await this.hospitalService.getHospitalList();
    await this.HospitalList.snapshotChanges().subscribe(item =>{
      hospitalList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        let latlng = y.Coordinates.split(",",2);
        y.lat1 = parseFloat(latlng[0]);
        y.lng2 = parseFloat(latlng[1]);
        hospitalList.push(y);

      })
      console.log(hospitalList);
      this.dataHospital = new MatTableDataSource(hospitalList);
      this.dataHospital.sort = this.sort;
      this.dataHospital.paginator = this.paginator;

      
      
    });
  }


}


export interface PeriodicElement {
  Name: string;
  ContactNumber: string;
  Email: string;
  Address: string;
  Details: string;
}

