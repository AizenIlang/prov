import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { AppointmentsService } from 'src/app/service/appointments.service';
import { ReportParserService } from 'src/app/service/report-parser.service';

@Component({
  selector: 'app-adminappointmentreports',
  templateUrl: './adminappointmentreports.component.html',
  styleUrls: ['./adminappointmentreports.component.scss']
})
export class AdminappointmentreportsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private appointmentService: AppointmentsService,
    private reportService : ReportParserService) { }
  displayedColumns: string[] = ['hospitalName', 'user', 'firstName', 'lastName', 'gender', 'doctor', 'expertise', 'message', 'status', 'date'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataAppointment: any;

  AppointmentList: any;

  //Dates
  date = new FormControl(new Date());
  date2 = new FormControl(new Date());

  logoProvh : any;

  async ngOnInit() {
    // this.firebaseStorage.ref("provhlogo.png").getDownloadURL().subscribe(get=>{
    //   this.logoProvh = get;
    // });
    var appointmentList = [];
    var tempAppointment = [];
    this.dataAppointment = new MatTableDataSource(appointmentList);
    this.AppointmentList = await this.appointmentService.getAppointments();
    await this.AppointmentList.snapshotChanges().subscribe(item => {
      tempAppointment = [];
      appointmentList = [];

      console.log("THE BEGINIG");
      item.forEach(element => {
        var y = element.payload.toJSON();
        console.log(y);
        tempAppointment.push(y);


      });


      for (let app of tempAppointment) {
        console.log(app);
        for (let tec in app) {
          console.log("test " + tec);
          let value = app[tec];
          console.log("The value " + value);
          let reportObject = this.reportService.appointmentObjectParse(value);
          appointmentList.push(reportObject);
        }
      }
      console.log(appointmentList);
      this.dataAppointment = new MatTableDataSource(appointmentList);
      this.dataAppointment.sort = this.sort;
      this.dataAppointment.paginator = this.paginator;
    })
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log(`${year}-${month}-${day}`);
    return `${month}-${day}-${year}`;

  }

  async filterTestDate() {
    // let start = "01-02-2017";
    // let end = "01-07-2019";

    let start = this.formatDate(this.date.value);
    let end = this.formatDate(this.date2.value);

    var appointmentList = [];
    var tempAppointment = [];
    this.dataAppointment = new MatTableDataSource(appointmentList);
    this.AppointmentList = await this.appointmentService.getAppointments();
    await this.AppointmentList.snapshotChanges().subscribe(item => {
      tempAppointment = [];
      appointmentList = [];

      console.log("THE BEGINIG");
      item.forEach(element => {
        var y = element.payload.toJSON();
        console.log(y);
        tempAppointment.push(y);


      });


      for (let app of tempAppointment) {
        console.log(app);
        for (let tec in app) {
          console.log("test " + tec);
          let value = app[tec];
          console.log("The value " + value);
          let reportObject = this.reportService.appointmentObjectParse(value);
          appointmentList.push(reportObject);
        }
      }

      let selectedMembers = appointmentList.filter(
        m => new Date(m.date) >= new Date(start) && new Date(m.date) <= new Date(end)
      );
      console.log(appointmentList);
      this.dataAppointment = new MatTableDataSource(selectedMembers);
      this.dataAppointment.sort = this.sort;
      this.dataAppointment.paginator = this.paginator;
    })




  }

  downloadAppointmentPDF() {
    var doc = new jsPDF("p", "mm", "a4");

    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    html2canvas(document.getElementById('canvasAppointmentTable')).then(can => {

      var imgData = can.toDataURL("image/png");
      doc.setFontSize(30);
      doc.text(30, 18, 'Appointment Report PROV-H');
      doc.addImage(imgData, 'JPEG', 0, 30, width, 0);

      doc.save('AppointmentReports.pdf');
    })
  }

  applyFilter(filterValue: string) {

    this.dataAppointment.filter = filterValue.trim().toLowerCase();

  }
}
