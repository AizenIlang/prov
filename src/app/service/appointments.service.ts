import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Appointment } from '../Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private db : AngularFireDatabase) { }

  getAppointments(){
    return this.db.list('/Appointments');
  }

  getAppointmentsHospital(key){
    return this.db.list('/Appointments/'+key);
  }

  getAppointmentSingle(key){
    return this.db.object('/Appointments/'+key);

  }


  update(hospitalKey,appointment){
  //TODO ADD THE KEY FOR THE APPOINTMENTS INSTEAD
    console.log(appointment + " appointment.date");
    appointment.status = "Pending";
    this.db.object("/Appointments/"+hospitalKey).update(appointment).then(ful =>{
        swal("Update Complete");
       
    }, didnot => {
      swal(didnot);
    });
    //Add the Key in here. The Push key.Add anther element.
    this.db.object("/UserAppointments/"+appointment.uid+"/"+appointment.key).update(appointment);
  }

  delete(hospitalKey,appointmentkey,uid){
    this.db.object("/Appointments/"+hospitalKey+"/"+appointmentkey).remove();
    this.db.object("/UserAppointments/"+uid+"/"+appointmentkey).remove();
  }

  appoint(hospitalKey,appointmentkey,uid){
    this.db.object("/Appointments/"+hospitalKey+"/"+appointmentkey+"/status").set("Appointed");
    this.db.object("/UserAppointments/"+uid+"/"+appointmentkey+"/status").set("Appointed");
  }

}
