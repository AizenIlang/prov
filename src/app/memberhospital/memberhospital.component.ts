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



  displayedColumns: string[] = ['userName','message', 'status', 'type', 'date','user','actionsColumn'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any;

  dataComments: any;

  AppointmentList;
  CommentList;

  choiceAppointments = true;
  choiceComments = false;

  HospitalObject : any;

  picture : any;
  constructor(private storage : AngularFireStorage,public dialog: MatDialog,private hosptialService: HospitalService, private appointmentService: AppointmentsService, private commentService: CommentsService) { }

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
        appointmentlist.push(y);

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

  changeAppointments(){

    this.choiceAppointments = true;
    this.choiceComments = false;
   
    this.displayedColumns = ['userName','message', 'status', 'type', 'date','actionsColumn'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadAppointments();

  }

  changeComments(){

    this.choiceAppointments = false;
    this.choiceComments = true;
   
    this.displayedColumns = ['message', 'name', 'rate'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadComments();

  }



  onLinkClick(event: MatTabChangeEvent) {
    if(event.index == 0){
        this.changeAppointments();
    }
    if(event.index == 1){
      this.changeComments();
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

  editHospital(){
    let dialogRef = this.dialog.open(EdithospitalComponent, {
      data : this.user.hospitalKey
    });
    
  }
  
}
