import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HospitalService } from '../service/hospital.service';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable} from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Hospital} from '../Hospital';

import { ActivatedRoute } from '@angular/router';
import { Users } from '../Users';
import { UserService } from '../service/user.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface Location {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-edithospital',
  templateUrl: './edithospital.component.html',
  styleUrls: ['./edithospital.component.scss']
})
export class EdithospitalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private storage : AngularFireStorage, private hospitalService : HospitalService, private db : AngularFireDatabase) { }

 
  task : AngularFireUploadTask;

  percentage : Observable<number>;

  snapshot : Observable<any>;

  downloadURL : Observable<string>;

  isHovering : boolean;

  selectedLocation : any;

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

  Locations : Location[] = [
    {value : 'Caloocan City', viewValue : 'Caloocan City'},
    {value : 'Las Pinas City', viewValue : 'Las Pinas City'},
    {value : 'Makati City', viewValue : 'Makati City'},
    {value : 'Malabon City', viewValue : 'Malabon City'},
    {value : 'Mandaluyong City', viewValue : 'Mandaluyong City'},
    {value : 'Manila City', viewValue : 'Manila City'},
    {value : 'Marikina City', viewValue : 'Marikina City'},
    {value : 'Muntinlupa City', viewValue : 'MuntinLupa City'},
    {value : 'Navotas City', viewValue : 'Navotas City'},
    {value : 'Paranaque City', viewValue: 'Paranaque City'},
    {value : 'Pasay City', viewValue : 'Pasay City'},
    {value : 'Pasig City', viewValue : 'Pasig City'},
    {value : 'Quezon City', viewValue :'Quezon City'},
    {value : 'San Juan City', viewValue : 'San Juan City'},
    {value : 'Taguig City', viewValue : 'Taguig City'},
    {value : 'Valenzuela City', viewValue : 'Valenzuela City'}
  ];

  ngOnInit() {
    this.hospitalService.getSpecificHospital(this.data).valueChanges().subscribe(thedata =>{
    
      let x : any;
      x = thedata;
      console.log(this.data);
      console.log(x);
      this.HospitalID = x.HospitalID;
      this.Name  = x.Name;
      this.Location  = x.Location;
      this.Address  = x.Address;
      this.ContactNumber  = x.ContactNumber;
      this.Services  = x.Services;
      this.Email  = x.Email
      this.Coordinates  = x.Coordinates;
      this.Details  = x.Details;
      this.Rating  = x.Rating;
      this.selectedLocation = x.Location;
      this.Key  = x.Key;
    });

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

    if(!file){
      swal("New Image Required");
      return;
    }
    
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
          tempHospital.Location = this.selectedLocation;
          tempHospital.Name = this.Name;
          tempHospital.Rating = this.Rating;                 
          
          tempHospital.Key = this.data;
         this.hospitalService.updateHospital(this.data,tempHospital);
         
          
         })
       ).subscribe();
   
    
        
 
   
    
   

  }

  selected(event) {
   
    
    this.selectedLocation = event.value;
    console.log(this.selectedLocation);
  }


}
