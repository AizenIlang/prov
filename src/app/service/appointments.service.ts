import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

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


  update(hospitalKey,appointment){
    this.db.object('/Appointments/'+hospitalKey).update(appointment).then(ful =>{
        swal("Update Complete");
    }, didnot => {
      swal(didnot);
    });
}

}
