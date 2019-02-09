import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';
import { AppointmentsService } from '../service/appointments.service';
import { ReportParserService } from '../service/report-parser.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphappointment',
  templateUrl: './graphappointment.component.html',
  styleUrls: ['./graphappointment.component.scss']
})
export class GraphappointmentComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private appointmentService: AppointmentsService,
    private reportService: ReportParserService) { }

  ngOnInit() {
    
    this.getAppointments("");
  }

  graphfilter(value) {
    console.log(value);
  }

  mockGraph() {
    var theData = [23, 1, 3, 4, 5, 2,
      5, 2, 3, 5, 6, 4, 3, 2,
      0, 1,];
    this.generateHospitalChart(theData);
  }

  chartHospital = [];
  theTitle = "All Services";

  generateHospitalChart(theData) {
    console.log(JSON.stringify(theData) + "The Hospital Count");
    this.chartHospital = new Chart(
      'canvasHospital',
      {
        type: 'horizontalBar',
        data: {
          datasets: [{
            data: theData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(25, 20, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(15, 10, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(2, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(2, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 1, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 1, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 1, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(2, 159, 64, 0.2)',

            ]
          }],
          labels: [
            'Caloocan',
            'Las Pinas',
            'Makati',
            'Malabon',
            'Mandaluyong',
            'Manila',
            'Marikina',
            'Muntinlupa',
            'Navotas',
            'Paranaque',
            'Pasay',
            'Pasig',
            'Quezon City',
            'San Juan, Metro Manila',
            'Taguig',
            'Valenzuela, Metro Manila'
          ]
        }, scaleOverride: true,
        scaleStepWidth: 1,
        scaleSteps: 10,
        options: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
          legend: {
            display: false,
            position: 'left',
          }
        }

      });
  }

  getAppointments(filter) {
    var CaloocanCity = 0;
    var LasPinasCity = 0;
    var MakatiCity = 0;
    var MalabonCity = 0;
    var MandaluyongCity = 0;
    var ManilaCity = 0;
    var MarikinaCity = 0;
    var MuntinlupaCity = 0;
    var NavotasCity = 0;
    var ParanaqueCity = 0;
    var PasayCity = 0;
    var PasigCity = 0;
    var QuezonCity = 0;
    var SanJuanCity = 0;
    var TaguigCity = 0;
    var ValenzuelaCity = 0;

    let myData: any;
    this.appointmentService.getAppointments().valueChanges().subscribe(data => {
      myData = data;
      for (let x of myData) {
        console.log("Main x :" +JSON.stringify(x));
        var resultArray = Object.keys(x).map(function(personNamedIndex){
          let person = x[personNamedIndex];
          // do something with person
          return person;
      });
      console.log("Logging the result array :" + JSON.stringify(resultArray));
        for (let y of resultArray) {
          console.log("Main y :" +y);
          if (y.location == "Caloocan City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Caloocan City") {
            CaloocanCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Las Pinas City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Las Pinas City") {
            LasPinasCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Makati City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Makati City") {
            MakatiCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Malabon City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Malabon City") {
            MalabonCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Mandaluyong City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Mandaluyong City") {
            MandaluyongCity++;
            this.theTitle = y.type;
            console.log(MandaluyongCity + "Mandaluyong City is");
          }
          if (y.location == "Manila City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Manila City") {
            ManilaCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Marikina City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Marikina City") {
            MarikinaCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Muntinlupa City"  && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Muntinlupa City") {
            MuntinlupaCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Navotas City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Navotas City") {
            NavotasCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Paranaque City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Paranaque City") {
            ParanaqueCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Pasay City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Pasay City") {
            PasayCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Pasig City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Pasig City") {
            PasigCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Quezon City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Quezon City") {
            QuezonCity++;
            this.theTitle = y.type;
          }
          if (y.location == "San Juan City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "San Juan City") {
            SanJuanCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Taguig City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Taguig City") {
            TaguigCity++;
            this.theTitle = y.type;
          }
          if (y.location == "Valenzuela City" && y.type.toLowerCase().includes(filter.toLowerCase()) || filter == "" && y.location == "Valenzuela City") {
            ValenzuelaCity++;
            this.theTitle = y.type;
          }
        }

        //End of forloop
        var theData = [CaloocanCity, LasPinasCity, MakatiCity, MalabonCity, MandaluyongCity, ManilaCity,
          MarikinaCity, MuntinlupaCity, NavotasCity, ParanaqueCity, PasayCity, PasigCity, QuezonCity, SanJuanCity,
          TaguigCity, ValenzuelaCity,];
          console.log("Data of the Appointments :" + theData);
          this.generateHospitalChart(theData);
      }
    });
  }
  getTotalHospitalArray() {
    var CaloocanCity = 0;
    var LasPinasCity = 0;
    var MakatiCity = 0;
    var MalabonCity = 0;
    var MandaluyongCity = 0;
    var ManilaCity = 0;
    var MarikinaCity = 0;
    var MuntinlupaCity = 0;
    var NavotasCity = 0;
    var ParanaqueCity = 0;
    var PasayCity = 0;
    var PasigCity = 0;
    var QuezonCity = 0;
    var SanJuanCity = 0;
    var TaguigCity = 0;
    var ValenzuelaCity = 0;

    //   let hospitalValue : any;
    // this.hospitalService.getHospitalList().valueChanges().subscribe(value=>{
    //   hospitalValue = value;
    //    for(let tempValue of hospitalValue){
    //      console.log(tempValue.Location);
    //      if(tempValue.Location == "Caloocan City"){
    //        CaloocanCity++;
    //      }
    //      if(tempValue.Location == "Las Pinas City"){
    //        LasPinasCity++;
    //      }
    //      if(tempValue.Location == "Makati City"){
    //        MakatiCity++;
    //      }
    //      if(tempValue.Location == "Malabon City"){
    //        MalabonCity++;
    //      }
    //      if(tempValue.Location == "Mandaluyong City"){
    //        MandaluyongCity++;
    //        console.log(MandaluyongCity + "Mandaluyong City is");
    //      }
    //      if(tempValue.Location == "Manila City"){
    //        ManilaCity++;
    //      }
    //      if(tempValue.Location == "Marikina City"){
    //        MarikinaCity++;
    //      }
    //      if(tempValue.Location == "Muntinlupa City"){
    //        MuntinlupaCity++;
    //      }
    //      if(tempValue.Location == "Navotas City"){
    //        NavotasCity++;
    //      }
    //      if(tempValue.Location == "Paranaque City"){
    //        ParanaqueCity++;
    //      }
    //      if(tempValue.Location == "Pasay City"){
    //        PasayCity++;
    //      }
    //      if(tempValue.Location == "Pasig City"){
    //        PasigCity++;
    //      }
    //      if(tempValue.Location == "Quezon City"){
    //        QuezonCity++;
    //      }
    //      if(tempValue.Location == "San Juan City"){
    //        SanJuanCity++;
    //      }
    //      if(tempValue.Location == "Taguig City"){
    //        TaguigCity++;
    //      }
    //      if(tempValue.Location == "Valenzuela City"){
    //        ValenzuelaCity++;
    //      }

    //    }
    //    var theData = [CaloocanCity,LasPinasCity,MakatiCity,MalabonCity,MandaluyongCity,ManilaCity,
    //     MarikinaCity,MuntinlupaCity,NavotasCity,ParanaqueCity,PasayCity,PasigCity,QuezonCity,SanJuanCity,
    //   TaguigCity,ValenzuelaCity,];
    //    this.generateHospitalChart(theData);
    // })
  }

}
