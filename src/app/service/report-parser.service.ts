import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HospitalService } from './hospital.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';


export class AppointmentObjectReport{
  hospitalName : string;
  userName : string;
  firstName : string;
  lastName : string;
  gender : string;
  doctor : string;
  expertise : string;
  message : string;
  status : string;
  date : string;
}

export class UserObjectReport{
  userName : string;
  email : string;
  type : string;
  bloodType : string;
  gender : string;
  date : string;
  firstName : string;
  middleName : string;
  lastName : string;
  hospitalMember : string;
  userKey : string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportParserService {

  constructor(private userService : UserService,
    private hospitalService : HospitalService,
    private storage : AngularFireStorage) { }

    getImage(location : string) : any{
      this.storage.ref(location).getDownloadURL().subscribe(data =>{
        return data;
      });
      
    }
  appointmentObjectParse(appointment : any) : AppointmentObjectReport{
    console.log("Double check the values " + appointment.user.userName + " " + appointment.user.lastName);
     let tempAppointment = new AppointmentObjectReport();

     tempAppointment.userName = appointment.user.userName;
     tempAppointment.firstName = appointment.user.firstName;
     tempAppointment.lastName = appointment.user.lastName;
     tempAppointment.hospitalName = appointment.hospitalName;
     tempAppointment.doctor = appointment.doctor.firstName + " " + appointment.doctor.lastName;
     tempAppointment.message = appointment.message;
     tempAppointment.status = appointment.status;
     tempAppointment.expertise = appointment.doctor.service;
     tempAppointment.gender = appointment.user.gender;
     tempAppointment.date = appointment.date;



     return tempAppointment;
  }

  userObjectParse(user : any): UserObjectReport {
    
    
    
    
      let tempUser = new UserObjectReport();
      
      // tempUser.hospitalMember =   theValue.Name;
      
      tempUser.bloodType = user.bloodType;
      tempUser.date = user.date;
      tempUser.email = user.email;
      tempUser.firstName = user.firstName;
      tempUser.gender = user.gender;
      tempUser.lastName = user.lastName;
      tempUser.middleName = user.middleName;
      tempUser.userKey = user.userKey;
      tempUser.type = "User";
      if(user.admin){
        tempUser.type = "Admin";
      }
      if(user.hospitalMember){
        tempUser.type = "Hospital Admin";
      }
      tempUser.userName = user.userName;
      return tempUser;
    
   

    
  }
}
