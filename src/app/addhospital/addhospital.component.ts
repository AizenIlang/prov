import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HospitalService } from '../service/hospital.service';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable} from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Hospital} from '../Hospital';
import { FormGroup, Validators,FormControl } from '@angular/forms';

export interface Location {
  value: string;
  viewValue: string;
}

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

  selectedLocation : any;

  Locations : Location[] = [
    {value : 'Caloocan', viewValue : 'Caloocan'},
    {value : 'Las Pinas', viewValue : 'Las Pinas'},
    {value : 'Makati', viewValue : 'Makati'},
    {value : 'Malabon', viewValue : 'Malabon'},
    {value : 'Mandaluyong', viewValue : 'Mandaluyong'},
    {value : 'Manila', viewValue : 'Manila'},
    {value : 'Marikina', viewValue : 'Marikina'},
    {value : 'Muntinlupa', viewValue : 'MuntinLupa'},
    {value : 'Navotas', viewValue : 'Navotas'},
    {value : 'Paranaque', viewValue: 'Paranaque'},
    {value : 'Pasay', viewValue : 'Pasay'},
    {value : 'Pasig', viewValue : 'Pasig'},
    {value : 'Quezon City', viewValue :'Quezon City'},
    {value : 'San Juan City, Metro Manila', viewValue : 'San Juan City, Metro Manila'},
    {value : 'Taguig', viewValue : 'Taguig'},
    {value : 'Valenzuela, Metro Manila', viewValue : 'Valenzuela, Metro Manila'}
  ];

  form = new FormGroup({
    HospitalIDControl : new FormControl('',Validators.required),
    NameControl : new FormControl('',Validators.required),
    LocationControl : new FormControl('',Validators.required),
    AddressControl : new FormControl('',Validators.required),
    ContactNumberControl : new FormControl('',Validators.required),
    ServicesControl : new FormControl('', Validators.required),
    EmailControl : new FormControl('',[Validators.required,Validators.email]),
    CoordinatesControl : new FormControl('',Validators.required),
    DetailsControl : new FormControl('',Validators.required),
    RatingControl : new FormControl(0,Validators.required)
    
  });

  get HospitalIDControl(){
    return this.form.get('HospitalIDControl');
  }
  get CoordinatesControl(){
    return this.form.get('CoordinatesControl');
  }
  get DetailsControl(){
    return this.form.get('DetailsControl');
  }

  get RatingControl(){
    return this.form.get('RatingControl');
  }

  get NameControl(){
    return this.form.get('NameControl');
  }
  get LocationControl(){
    return this.form.get('LocationControl');
  }
  get AddressControl(){
    return this.form.get('AddressControl');
  }
  get ContactNumberControl(){
    return this.form.get('ContactNumberControl');
  }
  get ServicesControl(){
    return this.form.get('ServicesControl');
  }
  get EmailControl(){
    return this.form.get('EmailControl');
  }

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
          tempHospital.HospitalID = this.HospitalIDControl.value;
          tempHospital.Address = this.AddressControl.value;
          tempHospital.ContactNumber = this.ContactNumberControl.value;
          tempHospital.Coordinates = this.CoordinatesControl.value;
          tempHospital.Details = this.DetailsControl.value;
          tempHospital.Services = this.ServicesControl.value;
          tempHospital.Email = this.EmailControl.value;
          tempHospital.image = path;
          tempHospital.Location = this.selectedLocation.value;
          tempHospital.Name = this.NameControl.value;
          tempHospital.Rating = this.RatingControl.value;
          
          
          const theID = this.db.createPushId();
          tempHospital.Key = theID;
         this.hospitalService.createandPushHospital(path,tempHospital);
          
         })
       ).subscribe();
   
      
        
 
   
    
   

  }

  selected(event) {
   
    
    this.selectedLocation = event.value;
    console.log(this.selectedLocation);
  }




}
