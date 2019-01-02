import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { Appointment } from '../Appointment';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DoctorsService } from '../service/doctors.service';


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



  form = new FormGroup({
    dateControl: new FormControl('',Validators.required),
    hopsitalFormControl : new FormControl('',Validators.required),
    doctorControl: new FormControl('', Validators.required)
  });

  
  get dateControl(){
    return this.form.get('dateControl');
  }

  get hospitalFormControl(){
    return this.form.get('hospitalFormControl');
  }

  get doctorControl(){
    return this.form.get('doctorControl');
  }

  selectedValue;
  selectedValueDoctor;


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
  doctorsList : any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appointmentService: AppointmentsService,
  private doctorsService : DoctorsService,private dialog : MatDialog) { }

  ngOnInit() {
    let x: any;
    x = JSON.parse(localStorage.getItem("user"));
    this.theHospitalKey = x.hospitalKey;
    this.appointmentService.getAppointmentSingle(x.hospitalKey + "/" + this.data).valueChanges().subscribe(thedata => {
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
      this.Appointment.doctor = this.doctorControl.value;
    });

    this.doctorsService.getDoctorsServiceHospital(this.theHospitalKey).valueChanges().subscribe(theData=>{
      this.doctorsList = theData;
      console.log(theData +" the key " +this.theHospitalKey);
    });


  }

  onUpdate() {
    if (!this.selectedValue) {
      this.selectedValue = "";

    }

    console.log("Check me again " + this.data);

    if (!this.selectedValue) {
      this.selectedValue = this.time;
    }


    let x: any;
    x = JSON.parse(localStorage.getItem('user'));
    console.log("see this. " + x.hospitalKey);
   
    
    this.Appointment.status = "Pending";
    this.appointmentService.update("/" + x.hospitalKey + "/" + this.data, this.Appointment);
    console.log(x.hospitalKey + "/" + this.data);
    this.dialog.closeAll();
  }

  selectedTime(event) {


    this.selectedValue = event.value.name;
    this.Appointment.date = this.dateControl.value + " " + event.value.name;


  }

  selectedDoctor(event){
     this.selectedDoctor = event.value;
     console.log(this.selectedDoctor);
     this.Appointment.doctor = this.selectedDoctor;
  }
}
