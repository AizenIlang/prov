import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private db :AngularFireDatabase) { }
  key;

  getHospitalList(){
    return this.db.list('/Hospitals');
  }

  getHospital(key){
    return this.db.object(key);
  }
  
  addHospital(hospital : Hospital){
    this.key = this.db.createPushId();
    hospital.Key = this.key;
    this.db.object('/Hospitals').set(hospital).then(f =>{
      swal("Added Hospital "+ hospital.Name);
    });
  }
  

}
