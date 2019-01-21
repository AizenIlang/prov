import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentsService } from 'src/app/service/appointments.service';
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ImageService } from 'src/app/service/image.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ReportParserService } from 'src/app/service/report-parser.service';



@Component({
  selector: 'app-appointmentreports',
  templateUrl: './appointmentreports.component.html',
  styleUrls: ['./appointmentreports.component.scss']
})
export class AppointmentreportsComponent implements OnInit {

  constructor(private appointmentService: AppointmentsService,
    private userService : UserService,
    private imageService : ImageService,
    private firebaseStorage : AngularFireStorage,
    private reportParserService : ReportParserService) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['hospitalName', 'user', 'firstName', 'lastName', 'gender', 'doctor', 'expertise', 'message', 'status', 'date'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataAppointment: any;

  AppointmentList: any;

  //Dates
  date = new FormControl(new Date());
  date2 = new FormControl(new Date());

  logoProvh :  any;
  async ngOnInit() {
    // this.firebaseStorage.ref("provhlogo.png").getDownloadURL().subscribe(get=>{
    //   this.logoProvh = get;
    // });
    var appointmentList = [];
    var tempAppointment = [];
    this.dataAppointment = new MatTableDataSource(appointmentList);
    this.AppointmentList = await this.appointmentService.getAppointmentsHospital(this.userService.user.hospitalKey);
    await this.AppointmentList.snapshotChanges().subscribe(item => {
      tempAppointment = [];
      appointmentList = [];

      console.log("THE BEGINIG");
      item.forEach(element => {
        var y = element.payload.toJSON();
        console.log(y);
        let reportobject = this.reportParserService.appointmentObjectParse(y);
        appointmentList.push(reportobject);


      });


      
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
    this.AppointmentList = await this.appointmentService.getAppointmentsHospital(this.userService.user.hospitalKey);
    await this.AppointmentList.snapshotChanges().subscribe(item => {
      tempAppointment = [];
      appointmentList = [];

      console.log("THE BEGINIG");
      item.forEach(element => {
        var y = element.payload.toJSON();
        console.log(y);
        appointmentList.push(y);


      });


      // for (let app of tempAppointment) {
      //   console.log(app);
      //   for (let tec in app) {
      //     console.log("test " + tec);
      //     let value = app[tec];
      //     console.log("The value " + value);
      //     appointmentList.push(value);
      //   }
      // }

      let selectedMembers = appointmentList.filter(
        m => new Date(m.date) >= new Date(start) && new Date(m.date) <= new Date(end)
      );
      console.log(appointmentList);
      this.dataAppointment = new MatTableDataSource(selectedMembers);
      this.dataAppointment.sort = this.sort;
      this.dataAppointment.paginator = this.paginator;
    })




  }

  downloadAppointmentPDF(){
    var doc = new jsPDF("p", "mm", "a4");

    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    html2canvas(document.getElementById('canvasAppointmentTable')).then(can =>{
      
      var imgData = can.toDataURL("image/png");
      doc.setFontSize(30);
      doc.text(30, 18, 'Appointment Report PROV-H');
      doc.addImage(imgData,'JPEG',0,30,width,0);
      
      doc.save('AppointmentReports.pdf');
    })
  }


  imageToShow: any;

createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}
  isImageLoading = true;

getImageFromService() {
  this.isImageLoading = true;
  console.log("Got Here at imag");
  this.imageService.getImage('https://firebasestorage.googleapis.com/v0/b/prov-h-fae96.appspot.com/o/provhlogo.png?alt=media&token=61d2abfc-39b0-48f6-b76f-f3145f31aca8').subscribe(data => {
    this.createImageFromBlob(data);
    this.isImageLoading = false;
  }, error => {
    this.isImageLoading = false;
    console.log(error);
  });
}
applyFilter(filterValue: string) {

  this.dataAppointment.filter = filterValue.trim().toLowerCase();

}


}
