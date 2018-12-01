import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../service/hospital.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatTabChangeEvent } from '@angular/material';
import { AppointmentsService } from '../service/appointments.service';
import { Router } from '@angular/router';
import { CommentsService } from '../service/comments.service';

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



  displayedColumns: string[] = ['message', 'status', 'type', 'date'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any;

  AppointmentList;

  choiceAppointments = true;
  choiceComments = false;

  constructor(private hosptialService: HospitalService, private appointmentService: AppointmentsService, private commentService: CommentsService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loadAppointments();




  }

  async loadAppointments() {
    this.hosptialService.getHospital(this.user.hospitalKey).valueChanges().subscribe(data => {
      this.Hospital = data;
      console.log(this.user.hospitalKey);

      var appointments = [];
      this.appointmentService.getAppointmentsHospital(this.user.hospitalKey).snapshotChanges().subscribe(item => {
        item.forEach(element => {
          var y = element.payload.toJSON();
          appointments.push(y);
        })
        this.data = new MatTableDataSource(appointments);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;

      });
    });
  }


  
  async loadComments() {
    this.commentService.getCommentHospital(this.user.hospitalKey).valueChanges().subscribe(data => {
      this.Hospital = data;
      console.log(this.user.hospitalKey);

      var appointments = [];
      this.appointmentService.getAppointmentsHospital(this.user.hospitalKey).snapshotChanges().subscribe(item => {
        item.forEach(element => {
          var y = element.payload.toJSON();
          appointments.push(y);
        })
        this.data = new MatTableDataSource(appointments);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;

      });
    });
  }

  changeAppointments(){

    this.choiceAppointments = true;
    this.choiceComments = false;
   
    this.displayedColumns = ['message', 'status', 'type', 'date'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadAppointments();

  }

  changeComments(){

    this.choiceAppointments = true;
    this.choiceComments = false;
   
    this.displayedColumns = ['message', 'status', 'type', 'date'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadAppointments();

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
}
