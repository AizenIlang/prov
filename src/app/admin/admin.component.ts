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
import { AppComponent } from '../app.component';
import { MessagingService } from '../messaging.service';
import { auth } from 'firebase';


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

  displayedColumnsHospital: string[] = ['Name','Address','ContactNumber','Location','Email','actionsColumn'];
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

  totalGenderData = [];

  //END OF USAGE FOR CHART

  constructor(public dialog: MatDialog, private userService : UserService, private hospitalService : HospitalService,
     private router : Router, private appointmentService : AppointmentsService,
     private reportService : ReportParserService,
     private appcomponent : AppComponent,
     private msgService : MessagingService) {


    this.checkMe = JSON.parse(localStorage.getItem('user'));
    if(!this.checkMe.admin){
      console.log(!this.checkMe.admin);
      this.router.navigate(['']);
    }
      
   }


   //STORAGE UPLOAD

   


message;
  async ngOnInit() {
    auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        // User is signed in.
        this.msgService.requestPermission(auth().currentUser.uid);
      this.msgService.receiveMessage();
      this.message = this.msgService.currentMessage;
      } else {
        // No user is signed in.
      }
    });
      
    
   
    console.log("re instate");
    
   
    this.userService.getUsers().valueChanges().subscribe(data=>{
      this.UserList;
    });
    
    
    this.changeUsers();
    
  
  }

  AddUser(){
    this.dialog.open(SignupComponent,{
      height: '500px'
     
    });
  }

  AddHospital(){
    this.dialog.open(AddhospitalComponent,{
      height: '500px'
     
    });
  }

  deleteUser(key){
    this.userService.delete(key);
  }

  changeUsers(){
    this.choiceisUser = true;
    this.choiceisHopital = false;
    this.choiceisReport = false;
    console.log(this.choiceisHopital);
    this.displayedColumns = ['userName','email','type','hospitalMember','bloodType','gender','date','firstName','middleName','lastName','created','actionsColumn'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadUsers();
  }

  changeHospital(){
    this.choiceisUser = false;
    this.choiceisHopital = true;
    this.choiceisReport = false;
    console.log(this.choiceisHopital);
    this.displayedColumns = ['Name','Address','ContactNumber','Location','Email','actionsColumn'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadHospital();
    
  }

  changeTools(){
    this.choiceisUser = false;
    this.choiceisHopital = false;
    this.choiceisReport = true;
    this.getTotalGenderArray();
   
    // this.displayedColumns = ['hospitalName','user','firstName','lastName','gender','doctor','expertise','message','status','date'];
    // this.columnsToDisplay = this.displayedColumns.slice();
    // this.chartReportAppointment();

    

     


        

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
      data : theKey,
      height : '500px'
    });
    
  }

  editHospital(key){
    let dialogRef = this.dialog.open(EdithospitalComponent, {
      data : key,
      height : '500px'
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
    var doc = new jsPDF("p", "mm", "a4");
    var date = new Date();
    var imageLogo = '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';
    var dateformated = this.formatDate(date);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    html2canvas(document.getElementById('canvasHospital')).then(can => {

      var imgData = can.toDataURL("image/png");
      doc.setFontSize(20);
      doc.text(80,20,date.toDateString()); //Top Head Date
      doc.addImage(imageLogo,'JPEG',5 ,20); // The Image
      doc.text(220,20,date.getFullYear().toString()); //Right wing Date
      doc.text(220,40,date.getMonth()+1 .toString()); //Right wing Date
      doc.text(70,60,'Hospital Report Generation'); //Should be Hospital Name
      doc.text(80, 40, 'PROV-H Locator');
      // doc.text(80,80,'Address Sample');
      // doc.text(80,90,'Contact #');
      doc.addImage(imgData, 'JPEG', 0, 70, width, 0);
      doc.text(90,290,'LGNDS');
      doc.save('HospitalReports.pdf');
    })
  }


  GenerateUserReport(){
    

   
    var doc = new jsPDF("p", "mm", "a4");
    var date = new Date();
    var imageLogo = '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';
    var dateformated = this.formatDate(date);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    html2canvas(document.getElementById('canvasUserTable')).then(can => {

      var imgData = can.toDataURL("image/png");
      doc.setFontSize(20);
      doc.text(80,20,date.toDateString()); //Top Head Date
      doc.addImage(imageLogo,'JPEG',5 ,20); // The Image
      doc.text(220,20,date.getFullYear().toString()); //Right wing Date
      doc.text(220,40,date.getMonth()+1 .toString()); //Right wing Date
      doc.text(70,60,'User Report Generation'); //Should be Hospital Name
      doc.text(80, 40, 'PROV-H Locator');
      // doc.text(80,80,'Address Sample');
      // doc.text(80,90,'Contact #');
      doc.addImage(imgData, 'JPEG', 0, 70, width, 0);
      doc.text(90,290,'LGNDS');
      doc.save('UserReports.pdf');
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

    
    var doc = new jsPDF("p", "mm", "a4");
    var date = new Date();
    var imageLogo = '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';
    var dateformated = this.formatDate(date);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    html2canvas(document.getElementById('canvasAppointmentTable')).then(can => {

      var imgData = can.toDataURL("image/png");
      doc.setFontSize(20);
      doc.text(80,20,date.toDateString()); //Top Head Date
      doc.addImage(imageLogo,'JPEG',5 ,20); // The Image
      doc.text(220,20,date.getFullYear().toString()); //Right wing Date
      doc.text(220,40,date.getMonth()+1 .toString()); //Right wing Date
      doc.text(70,60,'User Report Generation'); //Should be Hospital Name
      doc.text(80, 40, 'PROV-H Locator');
      // doc.text(80,80,'Address Sample');
      // doc.text(80,90,'Contact #');
      doc.addImage(imgData, 'JPEG', 0, 70, width, 0);
      doc.text(90,290,'LGNDS');
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


  //PIECHART Gender
  getTotalGenderArray() {
    var male = 0;
    var female = 0;
    let userList : any;
    this.userService.getUsers().valueChanges().subscribe(user=>{
      userList = user;
      console.log("Check the users gender" + JSON.stringify(userList));
      for(let tempUser of userList){
        console.log("Getting itterated? " +tempUser.gender);
        if(tempUser.gender == "Male"){
          male++;
          console.log("added the male?" +male);
        }else{
          female++;
          console.log("added the female?" +female);
        }
      }
      this.generateGenderChart(male,female);
    })
    
  }

 
  //END of PIECHART

  
  generateGenderChart(male,female){
    this.chartUser = new Chart(
      'canvasUser',
      {type : 'doughnut',
      data :{
        datasets: [{
          data : [male,female],
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
          'Male',
          'Female'
          
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

}



