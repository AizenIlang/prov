import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HospitalService } from '../service/hospital.service';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable} from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Hospital} from '../Hospital';


@Component({
  selector: 'app-addhospital',
  templateUrl: './addhospital.component.html',
  styleUrls: ['./addhospital.component.scss']
})
export class AddhospitalComponent implements OnInit {

  constructor(private storage : AngularFireStorage, private hospitalService : HospitalService, private db : AngularFireDatabase) { }

  task : AngularFireUploadTask;

  percentage : Observable<number>;

  snapshot : Observable<any>;

  downloadURL : Observable<string>;

  isHovering : boolean;

  HospitalID : number;
  Name : String;
  Location : String;
  Address : String;
  ContactNumber : String;
  Services : String;
  Email : String;
  Coordinates : String;
  Details : String;
  Rating : number;
  image : string;
  Key : String;

  theFile: any;

  ngOnInit() {

  }

 sanitizeUpload(event : FileList){
  const file = event.item(0);
  if(file.type.split('/')[0] !== 'image'){
    console.error('unsupported file format');
    return;
  }
  this.theFile = file;
 }

  checkUpload(){
    const file = this.theFile;
    
    if(file.type.split('/')[0] !== 'image'){
      console.error('unsupported file format');
      return;
    }
     
    const path = `hospital/${new Date().getTime()}_${file.name}`;
    
    const customMetadata = { app : 'PROV-H meta'};

    const ref = this.storage.ref(path);
    
    this.task = ref.put(file,{customMetadata});

      
    
    
    
       this.task.snapshotChanges().pipe(
         finalize(()=>{
          const tempHospital = new Hospital;    
          tempHospital.HospitalID = this.HospitalID;
          tempHospital.Address = this.Address;
          tempHospital.ContactNumber = this.ContactNumber;
          tempHospital.Coordinates = this.Coordinates;
          tempHospital.Details = this.Details;
          tempHospital.Services = this.Services;
          tempHospital.Email = this.Email;
          tempHospital.image = path;
          tempHospital.Location = this.Location;
          tempHospital.Name = this.Name;
          tempHospital.Rating = this.Rating;
          
          
          const theID = this.db.createPushId();
          tempHospital.Key = theID;
         this.hospitalService.createandPushHospital(path,tempHospital);
          
         })
       ).subscribe();
   
    
        
 
   
    
   

  }




}
