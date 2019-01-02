import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { Appointment } from '../Appointment';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DoctorsService } from '../service/doctors.service';

@Component({
  selector: 'app-appointmentassigndoctor',
  templateUrl: './appointmentassigndoctor.component.html',
  styleUrls: ['./appointmentassigndoctor.component.scss']
})
export class AppointmentassigndoctorComponent implements OnInit {


  form = new FormGroup({   
    doctorControl: new FormControl('', Validators.required)
  });

  selectedValueDoctor;
  Appointment: any;
  tempData: any;
  theHospitalKey;
  doctorsList : any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appointmentService: AppointmentsService,
  private doctorsService : DoctorsService,private dialog : MatDialog) { }
  get doctorControl(){
    return this.form.get('doctorControl');
  }
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


  selectedDoctor(event){
    this.selectedDoctor = event.value;
    console.log(this.selectedDoctor);
    this.Appointment.doctor = this.selectedDoctor;
 }


 onUpdate() {



  let x: any;
  x = JSON.parse(localStorage.getItem('user'));
  console.log("see this. " + x.hospitalKey);
 
  
  this.Appointment.status = "Pending";
  this.appointmentService.update("/" + x.hospitalKey + "/" + this.data, this.Appointment);
  console.log(x.hospitalKey + "/" + this.data);
  this.dialog.closeAll();
}


}
