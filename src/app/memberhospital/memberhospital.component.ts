import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../service/hospital.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatTabChangeEvent } from '@angular/material';
import { AppointmentsService } from '../service/appointments.service';
import { Router } from '@angular/router';
import { CommentsService } from '../service/comments.service';
import { AppointmentseditComponent } from '../appointmentsedit/appointmentsedit.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import {EdithospitalComponent} from '../edithospital/edithospital.component';
import { DoctorsService } from '../service/doctors.service';
import { DoctorsaddComponent } from '../doctorsadd/doctorsadd.component';
import { AppointmentassigndoctorComponent } from '../appointmentassigndoctor/appointmentassigndoctor.component';
import swal from 'sweetalert2';
import { ReportParserService } from '../service/report-parser.service';


@Component({
  selector: 'app-memberhospital',
  templateUrl: './memberhospital.component.html',
  styleUrls: ['./memberhospital.component.scss']
})
export class MemberhospitalComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  Hospital: any;
  user: any;

  


  displayedColumns: string[] = ['user', 'firstName', 'lastName', 'gender', 'doctor', 'expertise','preferredDoctor', 'message', 'status', 'date','actionsColumn'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any;

  dataComments: any;
  dataDoctors: any;

  AppointmentList;
  CommentList;
  DoctorList;

  choiceAppointments = true;
  choiceComments = false;
  choiceDoctors = false;

  HospitalObject : any;

  picture : any;
  constructor(private storage : AngularFireStorage,public dialog: MatDialog,
    private hosptialService: HospitalService,
    private appointmentService: AppointmentsService,
    private commentService: CommentsService,
    private doctorService: DoctorsService,
    private route : Router,
    private reportService : ReportParserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.hosptialService.getHospital("/Hospitals/"+this.user.hospitalKey).valueChanges().subscribe(theData =>{
      this.HospitalObject = theData;
      console.log(this.HospitalObject.image);
     this.storage.ref(this.HospitalObject.image).getDownloadURL().subscribe(data =>{
        this.picture = data;
      });
      
    });

    

    this.loadAppointments();




  }
  

  async loadAppointments() {
    var appointmentlist= [];
    this.data = new MatTableDataSource(appointmentlist);
    this.AppointmentList =  await this.appointmentService.getAppointmentsHospital(this.user.hospitalKey);
    await this.AppointmentList.snapshotChanges().subscribe(item =>{
      appointmentlist = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        let theObject = this.reportService.appointmentObjectParse(y);
        appointmentlist.push(theObject);

      })
      console.log(appointmentlist);
      this.data = new MatTableDataSource(appointmentlist);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;

      
      
    });
  }


  
  async loadComments() {
    var hospitalList= [];

    this.dataComments = new MatTableDataSource(hospitalList);
    this.CommentList =  await this.commentService.getComments(this.user.hospitalKey);
    await this.CommentList.snapshotChanges().subscribe(item =>{
      hospitalList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        hospitalList.push(y);

      })
      console.log(hospitalList);
      this.dataComments = new MatTableDataSource(hospitalList);
      this.dataComments.sort = this.sort;
      this.dataComments.paginator = this.paginator;

      
      
    });
  }

  async loadDoctors() {
    var hospitalList= [];

    this.dataDoctors = new MatTableDataSource(hospitalList);
    this.DoctorList =  await this.doctorService.getDoctorsServiceHospital(this.user.hospitalKey);
    await this.DoctorList.snapshotChanges().subscribe(item =>{
      hospitalList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        hospitalList.push(y);

      })
      console.log("The doctors " +hospitalList);
      this.dataDoctors = new MatTableDataSource(hospitalList);
      this.dataDoctors.sort = this.sort;
      this.dataDoctors.paginator = this.paginator;

      
      
    });
  }

  changeAppointments(){

    this.choiceAppointments = true;
    this.choiceComments = false;
    this.choiceDoctors = false;
   
    this.displayedColumns = ['user', 'firstName', 'lastName', 'gender', 'doctor', 'expertise','preferredDoctor', 'message', 'status', 'date','actionsColumn'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadAppointments();

  }

  changeComments(){

    this.choiceAppointments = false;
    this.choiceComments = true;
    this.choiceDoctors = false;
   
    this.displayedColumns = ['message', 'name', 'rate'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadComments();

  }

  changeDoctors(){
    this.choiceAppointments = false;
    this.choiceComments = false;
    this.choiceDoctors = true;
   
    this.displayedColumns = ['firstName', 'middleName', 'lastName','service'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadDoctors();

  }



  onLinkClick(event: MatTabChangeEvent) {
    if(event.index == 0){
        this.changeAppointments();
    }
    if(event.index == 1){
      this.changeComments();
    }
    if(event.index == 2){
      this.changeDoctors();
    }
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
  
    // this.router.navigate(['contacts']); 
  }


  editAppointment(theKey){
    let dialogRef = this.dialog.open(AppointmentseditComponent, {
      data : theKey
    });
    
  }

  assignDoctor(theKey){
    let dialogRef = this.dialog.open(AppointmentassigndoctorComponent,{
      data : theKey
    });
  }

  editHospital(){
    let dialogRef = this.dialog.open(EdithospitalComponent, {
      data : this.user.hospitalKey
    });
    
  }

  addDoctor(){
    let dialogRef = this.dialog.open(DoctorsaddComponent, {
      data : this.user.hospitalKey
    })
  }
  
  removeAppointment(theKey,theUid){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Appointment file!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true     
    })
    .then((willDelete) => {
      if (willDelete.value) {
         this.appointmentService.delete(this.user.hospitalKey,theKey,theUid);
        swal({title:"Poof! Your Appointment file has been deleted!",
          type: "success",
        });
      } else {
        swal("Your Appointment file is safe!");
      }
    });



  }

  switchtoAppointment(){
    this.route.navigate(['reportappointment']);
  }

  appoint(appkey,uid){
    this.appointmentService.appoint(this.user.hospitalKey,appkey,uid);
  }
}
