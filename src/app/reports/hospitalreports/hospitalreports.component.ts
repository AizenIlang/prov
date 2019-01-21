import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator,MatTable } from '@angular/material';
import { HospitalService } from 'src/app/service/hospital.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospitalreports',
  templateUrl: './hospitalreports.component.html',
  styleUrls: ['./hospitalreports.component.scss']
})
export class HospitalreportsComponent implements OnInit {

  constructor(private hospitalService : HospitalService, private route : Router) { }

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['Name','Address','Location','ContactNumber','Email'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataHospital: any;
  HospitalList : any;


  ngOnInit() {
    this.displayedColumns = ['Name','Address','Location','ContactNumber','Email'];
    this.columnsToDisplay = this.displayedColumns.slice();
    this.loadHospital();
  }

  async loadHospital(){
    var hospitalList= [];

    this.dataHospital = new MatTableDataSource(hospitalList);   
    this.HospitalList =  await this.hospitalService.getHospitalList();
    await this.HospitalList.snapshotChanges().subscribe(item =>{
      hospitalList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        hospitalList.push(y);
        
      })
      console.log(hospitalList);
      this.dataHospital = new MatTableDataSource(hospitalList);
      this.dataHospital.sort = this.sort;
      

      
      
    });
  }

  BackButton(){
    this.route.navigate(['admin']);
  }

  applyFilter(filterValue: string) {
    
      this.dataHospital.filter = filterValue.trim().toLowerCase();
    
    
  }

}
