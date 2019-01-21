import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SignupComponent} from '../signup/signup.component';
import { UserService } from '../service/user.service';
import { MatTableDataSource, MatSort, MatPaginator,MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { MatTabChangeEvent } from '@angular/material';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'; 
import {Observable} from 'rxjs';
import { AddhospitalComponent } from '../addhospital/addhospital.component';
import {EdituserComponent} from '../edituser/edituser.component';
import {EdithospitalComponent} from '../edithospital/edithospital.component';
import swal from 'sweetalert2';
import {Chart } from 'chart.js';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { AppointmentsService } from '../service/appointments.service';
import { FormControl } from '@angular/forms';
import { ReportParserService } from '../service/report-parser.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild('canvasUser') content : ElementRef;
  
  UserList : any;
  HospitalList : any;
  AppointmentList : any;
  checkMe : any;

  //Dates
  date = new FormControl(new Date());
  date2 = new FormControl(new Date());

  choiceisUser = true;
  choiceisHopital = false;
  choiceisReport = false;

  displayedColumns: string[] = ['userName','email','type','bloodType','gender','date','firstName','middleName','lastName','actionsColumn'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any;

  displayedColumnsHospital: string[] = ['Name','Address','ContactNumber','Email','actionsColumn'];
  columnsToDisplayHospital: string[] = this.displayedColumnsHospital.slice();
  dataHospital: any;

  displayedColumnsAppointment: string[] = ['hospitalName','user','message','status','date'];
  columnsToDisplayAppointment: string[] = this.displayedColumnsAppointment.slice();
  dataAppointment: any;


  //ANGUAR FIRE STORAGE USAGE
  task : AngularFireUploadTask;

  percentage : Observable<number>;

  snapshot : Observable<any>;

  downloadURL : Observable<string>;

  isHovering : boolean;



  //END OF USAGE

  //USAGE FOR CHART
  
  chartUser = [];
  chartHospital = [];
  

  //END OF USAGE FOR CHART

  constructor(public dialog: MatDialog, private userService : UserService, private hospitalService : HospitalService,
     private router : Router, private appointmentService : AppointmentsService,
     private reportService : ReportParserService) {


    this.checkMe = JSON.parse(localStorage.getItem('user'));
    if(!this.checkMe.admin){
      console.log(!this.checkMe.admin);
      this.router.navigate(['']);
    }
      
   }


   //STORAGE UPLOAD

   



  async ngOnInit() {
    this.userService.getUsers().valueChanges().subscribe(data=>{
      this.UserList;
    });
    
    this.changeUsers();
  
  
  }

  AddUser(){
    this.dialog.open(SignupComponent);
  }

  AddHospital(){
    this.dialog.open(AddhospitalComponent);
  }

  

  changeUsers(){
    this.choiceisUser = true;
    this.choiceisHopital = false;
    this.choiceisReport = false;
    console.log(this.choiceisHopital);
    this.displayedColumns = ['userName','email','type','bloodType','gender','date','firstName','middleName','lastName','actionsColumn'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadUsers();
  }

  changeHospital(){
    this.choiceisUser = false;
    this.choiceisHopital = true;
    this.choiceisReport = false;
    console.log(this.choiceisHopital);
    this.displayedColumns = ['Name','Address','ContactNumber','Email','actionsColumn'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadHospital();
    
  }

  changeTools(){
    this.choiceisUser = false;
    this.choiceisHopital = false;
    this.choiceisReport = true;

    // this.displayedColumns = ['hospitalName','user','firstName','lastName','gender','doctor','expertise','message','status','date'];
    // this.columnsToDisplay = this.displayedColumns.slice();
    // this.chartReportAppointment();

    this.chartHospital = new Chart(
      'canvasHospital',
      {type : 'bar',
      data :{
        datasets: [{
          data : [3,2,4,5,2,0,0,1,2,5,2,0,0,1,1,2],
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
      },
      options :{
        xAxes : [{
          display: true
        }],
        yAxes : [{
          display: true
        }]
      }
    
      });

      this.chartUser = new Chart(
        'canvasUser',
        {type : 'doughnut',
        data :{
          datasets: [{
            data : [10,20,30,10],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ]
          }],
          labels: [
            '1st Week',
            '2nd Week',
            '3rd Week',
            '4th Week'
          ]
        },
        options :{
          xAxes : [{
            display: true
          }],
          yAxes : [{
            display: true
          }]
        }
      
        });


        

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

  //NOT BEING USED YET
  resetTableUserTable(){
    
    this.data.data = [];
    this.table.renderRows();
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
        this.dialog.closeAll();
      })
      console.log(hospitalList);
      this.dataHospital = new MatTableDataSource(hospitalList);
      this.dataHospital.sort = this.sort;
      this.dataHospital.paginator = this.paginator;

      
      
    });
  }

  applyFilter(filterValue: string) {
    if(this.choiceisHopital){
      this.dataHospital.filter = filterValue.trim().toLowerCase();
    }else{
      this.data.filter = filterValue.trim().toLowerCase();
    }
    
  }

  changeUser(){

  }

  onLinkClick(event: MatTabChangeEvent) {
    if(event.index == 0){
        this.changeUsers();
    }
    if(event.index == 1){
      this.changeHospital();
    }

    if(event.index == 2){
      this.changeTools();
    }
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
  
    // this.router.navigate(['contacts']); 
  }

  editUser(theKey){
    let dialogRef = this.dialog.open(EdituserComponent, {
      data : theKey
    });
    
  }

  editHospital(key){
    let dialogRef = this.dialog.open(EdithospitalComponent, {
      data : key
    });
  }

  removeHospital(key){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Hospital file!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true     
    })
    .then((willDelete) => {
      if (willDelete.value) {
         this.hospitalService.deleteHospital(key);
        swal({title:"Poof! Your Hospital file has been deleted!",
          type: "success",
        });
      } else {
        swal("Your Hospital file is safe!");
      }
    });

  }

  reportUsersWeekly(){
    let resetMe : any;
    resetMe = document.getElementById('canvasUser');
    resetMe.width += 0;

    this.chartUser = new Chart(
      'canvasUser',
      {type : 'doughnut',
      data :{
        datasets: [{
          data : [10,20,30,10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ]
        }],
        labels: [
          '1st Week',
          '2nd Week',
          '3rd Week',
          '4th Week'
        ]
      },
      options :{
        xAxes : [{
          display: true
        }],
        yAxes : [{
          display: true
        }]
      }
    
      });

  }

  reportUsersMonthly(){
    let resetMe : any;
    resetMe = document.getElementById('canvasUser');
    resetMe.width += 0;
    this.chartUser = new Chart(
      'canvasUser',
      {type : 'line',
      data :{
        datasets: [{
          data : [10,20,30,10,2,4,10,0,0,2,32,3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ]
        }],
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      },
      options :{
        xAxes : [{
          display: true
        }],
        yAxes : [{
          display: true
        }]
      }
    
      });

  }


  reportUsersYearly(){
    let resetMe : any;
    resetMe = document.getElementById('canvasUser');
    resetMe.width += 0;
    this.chartUser = new Chart(
      'canvasUser',
      {type : 'bar',
      data :{
        datasets: [{
          data : [0,0,23,4],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ]
        }],
        labels: [
          '2016',
          '2017',
          '2018',
          '2019'
        ]
      },
      options :{
        xAxes : [{
          display: true
        }],
        yAxes : [{
          display: true
        }]
      }
    
      });

  }

  async chartReportAppointment(){
    var appointmentList= [];
    var tempAppointment = [];
    this.dataAppointment = new MatTableDataSource(appointmentList);   
    this.AppointmentList =  await this.appointmentService.getAppointments();
    await this.AppointmentList.snapshotChanges().subscribe(item =>{
      tempAppointment = [];
      appointmentList = [];
      
      console.log("THE BEGINIG");
      item.forEach(element => {
        var y = element.payload.toJSON();
        console.log(y);
        tempAppointment.push(y);
        
         
        });

      
      for(let app of tempAppointment){
        console.log(app);
        for(let tec in app){
           console.log("test " + tec);
           let value = app[tec];
           console.log("The value " + value);
           appointmentList.push(value);
        }
      }
      console.log(appointmentList);
      this.dataAppointment = new MatTableDataSource(appointmentList);
      this.dataAppointment.sort = this.sort;
      this.dataAppointment.paginator = this.paginator; 
      })
      // console.log(appointmentList);
      

      
      
    

  }
  

  downloadHospitalPDF(){
    let doc = new jsPDF();

    html2canvas(document.getElementById('canvasHospital')).then(can =>{
      var imgData = can.toDataURL("image/png");
      doc.setFontSize(40);
      doc.text(30, 150, 'Hospital Report PROV-H');
      doc.addImage(imgData,'JPEG',20,20);
      doc.save('HospitalReports.pdf');
    })
  }


  GenerateUserReport(){
    

   
    var doc = new jsPDF("p", "mm", "a4");

    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    html2canvas(document.getElementById('canvasUserTable')).then(can =>{
      
      var imgData = can.toDataURL("image/png");
      doc.setFontSize(30);
      doc.text(30, 18, 'UserTable Report PROV-H');
      doc.addImage(imgData,'JPEG',0,30,width,0);
      doc.save('UserTableReports.pdf');
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

  downloadUserPDF(){

    
    let doc = new jsPDF();

    html2canvas(document.getElementById('canvasUser')).then(can =>{
      var imgData = can.toDataURL("image/png");
      doc.setFontSize(40);
      doc.text(30, 150, 'User Report PROV-H');
      doc.addImage(imgData,'JPEG',20,20);
      doc.save('UserReports.pdf');
    })
  

  }

  formatDate(date : Date) : string{
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log(`${year}-${month}-${day}`);
    return `${month}-${day}-${year}`;

  }

  async filterTestDate(){
    // let start = "01-02-2017";
    // let end = "01-07-2019";

    let start = this.formatDate(this.date.value);
    let end = this.formatDate(this.date2.value);

    var appointmentList= [];
    var tempAppointment = [];
    this.dataAppointment = new MatTableDataSource(appointmentList);   
    this.AppointmentList =  await this.appointmentService.getAppointments();
    await this.AppointmentList.snapshotChanges().subscribe(item =>{
      tempAppointment = [];
      appointmentList = [];
      
      console.log("THE BEGINIG");
      item.forEach(element => {
        var y = element.payload.toJSON();
        console.log(y);
        tempAppointment.push(y);
        
         
        });

      
      for(let app of tempAppointment){
        console.log(app);
        for(let tec in app){
           console.log("test " + tec);
           let value = app[tec];
           console.log("The value " + value);
           appointmentList.push(value);
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

  //SWITCHING SECTION
  switchReportHospitalAdmin(){
    this.router.navigate(['/hospitalreport']);
  }

  switchReportAppointmentReport(){
    this.router.navigate(['/adminappointmentreport']);
  }

  switchReportUserAdmin(){
    this.router.navigate(['/userreports']);
  }

  //END OF SWITCHING

}



