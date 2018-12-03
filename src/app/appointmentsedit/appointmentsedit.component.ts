import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { Appointment } from '../Appointment';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';


export interface Time {
  name: string;
  type: string;
}


@Component({
  selector: 'app-appointmentsedit',
  templateUrl: './appointmentsedit.component.html',
  styleUrls: ['./appointmentsedit.component.scss']
})
export class AppointmentseditComponent implements OnInit {

  message: String;
  uid: String;
  type: String;
  date: String;
  hospitalName: String;
  status: String;
  userName: String;
  key: String;
  Appointment: any;
  tempData: any;

  bloodControl = new FormControl('', [Validators.required]);
  // selectFormControl = new FormControl('', Validators.required);
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  hopsitalFormControl = new FormControl('', Validators.required);

  selectedValue;

  time: Time[] = [
    { name: '6:00 am', type: '6:00 am' },
    { name: '7:00 am', type: '7:00 am' },
    { name: '8:00 am', type: '8:00 am' },
    { name: '9:00 am', type: '9:00 am' },
    { name: '10:00 am', type: '10:00 am' },
    { name: '11:00 am', type: '11:00 am' },
    { name: '12:00 pm', type: '12:00 pm' },
    { name: '1:00 pm', type: '1:00 pm' },
    { name: '2:00 pm', type: '2:00 pm' },
    { name: '3:00 pm', type: '3:00 pm' },
    { name: '4:00 pm', type: '4:00 pm' },

  ];

  theHospitalKey;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appointmentService: AppointmentsService) { }

  ngOnInit() {
    let x :any;
    x = JSON.parse(localStorage.getItem("user"));
    this.theHospitalKey = x.hospitalKey;
    this.appointmentService.getAppointmentSingle(x.hospitalKey+"/"+this.data).valueChanges().subscribe(thedata => {
      console.log(this.data);
      console.log(thedata);
      this.tempData = thedata;  
      this.Appointment = new Appointment();
      this.Appointment.date = this.tempData.date;
      this.Appointment.hospitalName = this.tempData.hospitalName;
      this.Appointment.message = this.tempData.message;
      this.Appointment.userName = this.tempData.userName;
      this.Appointment.key = this.tempData.key;
      this.Appointment.type = this.tempData.type;
      this.Appointment.uid = this.tempData.uid;
      this.Appointment.status = this.tempData.status;
    });


  }

  onUpdate() {
    if(!this.selectedValue){
      this.selectedValue ="";
      
    }

    console.log("Check me again "+this.data);

    if(!this.selectedValue){
      this.selectedValue = this.time;
    }

   
    let x : any ;
    x = JSON.parse(localStorage.getItem('user'));
    console.log("see this. "+x.hospitalKey);
    this.Appointment.status = "Pending";
    this.appointmentService.update("/"+x.hospitalKey+"/"+this.data,this.Appointment );
    console.log(x.hospitalKey+"/"+this.data);
  }

  selectedTime(event) {
   
    
    this.selectedValue = event.value.name;
    this.Appointment.date= this.date + " " +event.value.name;
    
    
  }
}
