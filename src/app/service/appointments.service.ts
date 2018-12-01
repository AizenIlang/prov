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
}
