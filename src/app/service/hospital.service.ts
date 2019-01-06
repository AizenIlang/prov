import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Hospital} from '../Hospital';


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

  getSpecificHospital(key){
    return this.db.object('/Hospitals/'+key);
  }
  
  addHospital(hospital : Hospital){
    this.key = this.db.createPushId();
    hospital.Key = this.key;
    this.db.object('/Hospitals/'+this.key).set(hospital).then(f =>{
      swal("Added Hospital "+ hospital.Name);
    });
  }

  deleteHospital(key){
    this.db.object('/Hospitals/'+key).remove();
  }


  
  createandPushHospital(path : string, hospital : Hospital ){
   
    // this.db.object('/Hospitals/'+theID).set(tempHospital);
    
    this.addHospital(hospital);
    
  }

  updateHospital(key : string , hospital : Hospital){
    this.db.object("/Hospitals/"+key).update(hospital).then(pow =>{
      swal("HOSPITAL Updated !!!");
    }, future =>{
      
    })
  }
  

}
