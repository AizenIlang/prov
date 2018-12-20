import { Component, OnInit } from '@angular/core';
import {Doctors} from '../Doctors';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Inject } from '@angular/core';
import { DoctorsService } from '../service/doctors.service';
import { HospitalService } from '../service/hospital.service';

@Component({
  selector: 'app-doctorsadd',
  templateUrl: './doctorsadd.component.html',
  styleUrls: ['./doctorsadd.component.scss']
})
export class DoctorsaddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private doctorService : DoctorsService,
              private dialog: MatDialog,
              private hospitalService : HospitalService) { }

  form = new FormGroup({
    firstName : new FormControl('',Validators.required),
    middleName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    service : new FormControl('',Validators.required)
  });

  serviceList : any;
  Hospital : any;
  selectedFromService : any;
  
  ngOnInit() {
    
      this.hospitalService.getSpecificHospital(this.data).valueChanges().subscribe(thedata=>{
            this.Hospital = thedata;
            this.serviceList = this.Hospital.Services.split('@');
            console.log(this.serviceList);
      });
  }

  onDoctorAdd(){
     let doc = new Doctors(this.firstName.value,
      this.middleName.value,
      this.lastName.value,
      this.selectedFromService);
      this.doctorService.addDoctorsServiceHospital(this.data).set(doc).then(fullfilled=>{
         swal("Doctor is created");
          this.dialog.closeAll();
      },rejected =>{
        swal(rejected);
      })
  }

  get firstName(){
    return this.form.get('firstName');
  }

  get middleName(){
    return this.form.get('middleName');
  }

  get lastName(){
    return this.form.get('lastName');
  }

  get service(){
    return this.form.get('service');
  }

  selectedService(event){
    this.selectedFromService = event.value
  }
  
//   selectedDoctor(event){
//     this.selectedDoctor = event.value;
//     console.log(this.selectedDoctor);
//     this.Appointment.doctor = this.selectedDoctor;
//  }

}
