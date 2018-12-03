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
  Appointment: Appointment;
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appointmentService: AppointmentsService) { }

  ngOnInit() {
    this.appointmentService.getAppointmentsHospital(this.data).valueChanges().subscribe(thedata => {
      this.tempData = thedata;
      this.Appointment = new Appointment();
      this.Appointment.date = this.tempData.date;
      this.Appointment.hospitalName = this.tempData.hospitalName;
      this.Appointment.message = this.tempData.status;
      this.Appointment.userName = this.tempData.userName;
      this.Appointment.key = this.tempData.key;
      this.Appointment.type = this.tempData.type;
      this.Appointment.uid = this.tempData.uid;
      this.Appointment.message = this.tempData.message;
    });


  }

  onUpdate() {
    

  }

    selectedTime(event) {


    this.selectedValue = event.value.name;
    console.log(this.selectedValue);
  }
}
