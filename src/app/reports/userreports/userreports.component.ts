import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { UserService } from 'src/app/service/user.service';
import { ReportParserService } from 'src/app/service/report-parser.service';



@Component({
  selector: 'app-userreports',
  templateUrl: './userreports.component.html',
  styleUrls: ['./userreports.component.scss']
})
export class UserreportsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private userService : UserService,
    private reportService : ReportParserService
   ) { }

  UserList : any;
  provhLogo : any;

  //Dates
  date = new FormControl(new Date());
  date2 = new FormControl(new Date());

  displayedColumns = ['userName','email','type','hospitalMember','bloodType','gender','date','firstName','middleName','lastName'];
  columnsToDisplay = this.displayedColumns.slice();
  data: any;

  ngOnInit() {
    // this.userService.getUsers().valueChanges().subscribe(data=>{
    //   this.UserList;
    // });
    this.provhLogo = this.reportService.getImage('provhlogo.png');
    this.loadUsers();
  }

  async loadUsers(){
    var userManagerList= [];
    
    
    this.data = new MatTableDataSource(userManagerList);
    this.UserList =  await this.userService.getUsers();
    await this.UserList.snapshotChanges().subscribe(item =>{
      userManagerList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        let userObject = this.reportService.userObjectParse(y);
        userManagerList.push(userObject);
 
      })
      console.log(userManagerList + "The user Manager") ;
      
      this.data = new MatTableDataSource(userManagerList);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
      
    });
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

    // var appointmentList = [];
    // var tempAppointment = [];
    // this.data = new MatTableDataSource(appointmentList);
    // this.UserList = await this.userService.getAppointments();
    // await this.AppointmentList.snapshotChanges().subscribe(item => {
    //   tempAppointment = [];
    //   appointmentList = [];

    //   console.log("THE BEGINIG");
    //   item.forEach(element => {
    //     var y = element.payload.toJSON();
    //     console.log(y);
    //     tempAppointment.push(y);


    //   });


     

    //   let selectedMembers = appointmentList.filter(
    //     m => new Date(m.date) >= new Date(start) && new Date(m.date) <= new Date(end)
    //   );
    //   console.log(appointmentList);
    //   this.data = new MatTableDataSource(selectedMembers);
    //   this.data.sort = this.sort;
    //   this.data.paginator = this.paginator;
    // })




  }

  downloadUserPDF() {
    var doc = new jsPDF("p", "mm", "a4");
    var date = new Date();
    var dateformated = this.formatDate(date);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    html2canvas(document.getElementById('canvasAppointmentTable')).then(can => {

      var imgData = can.toDataURL("image/png");
      doc.setFontSize(20);
      doc.text(80,20,date.toDateString()); //Top Head Date
      doc.text(220,20,date.getFullYear().toString()); //Right wing Date
      doc.text(220,40,date.getMonth()+1 .toString()); //Right wing Date
      doc.text(70,60,'Hospital Name Sample');
      doc.text(80, 40, 'PROV-H Locator');
      doc.text(80,80,'Address Sample');
      doc.text(80,90,'Contact #');
      doc.addImage(imgData, 'JPEG', 0, 70, width, 0);

      doc.save('UserReports.pdf');
    })
  }

  applyFilter(filterValue: string) {
    
    this.data.filter = filterValue.trim().toLowerCase();
  
  
}




}
