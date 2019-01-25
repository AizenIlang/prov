import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private db : AngularFireDatabase) { }

  getDoctorsServiceHospital(key){
    return this.db.list('Doctors/'+key);
  }

  getDoctor(key,dockey){
    return this.db.object('Doctors/'+key+'/'+dockey);
  }

  addDoctorsServiceHospital(key,generatedKey){
    
    return this.db.object('Doctors/'+key+'/'+generatedKey);
  }
}
