import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../Users';
import { UserService } from '../service/user.service';

import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormControl, Validators ,FormGroup} from '@angular/forms';
import { HospitalService } from '../service/hospital.service';
import {PasswordValidators} from '../common/validators/password.validators';


export interface BloodType {
  name: string;
  type: string;
}

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute, public userService: UserService,
    private hospitalService: HospitalService) { }
  user: any;
  key: string;

  actived: boolean;
  admin: boolean;
  email: String;
  hospitalMember: boolean;
  hospitalKey: String;
  firstName: String;
  middleName: String;
  lastName: String;
  bloodType: String;
  date: String;
  password: String;
  userName: String;
  userKey: String;
  address: String;
  gender : String;

  //forDropdown
  hospitalName : any;

  newBlood : BloodType = {
    name : '',
    type : ''
  }
  genders: string[] = ['Male', 'Female'];

  selectedVal: boolean; // for hopsital member
  selectedValue: any; // for blood type;
  selectedValueHospital: any; //for hospital member;

  hospitalList = [];

  form = new FormGroup({
    firstNameControl : new FormControl(this.firstName,[Validators.required]),
    middleNameControl : new FormControl(this.middleName,[Validators.required]),
    lastNameControl : new FormControl(this.lastName,[Validators.required]),
    addressControl : new FormControl(this.address,[Validators.required]),
    bloodControl : new FormControl('', [Validators.required]),
    userNameControl : new FormControl(this.userName,[Validators.required]),
    // animalControl : new FormControl('', [Validators.required]),
    // selectFormControl : new FormControl('', Validators.required),
    hospitalFormControl : new FormControl(this.hospitalName,),
    dateControl : new FormControl('',[Validators.required]),
    passwordControl : new FormControl('',[Validators.required]),
    retypepasswordControl : new FormControl('',[Validators.required,PasswordValidators.passwordMatch]),
    emailControl : new FormControl('',[Validators.required, Validators.email]),
    genderControl : new FormControl('',[Validators.required])
  });
  get genderControl(){
    return this.form.get('genderControl');
  }
  get emailControl(){
    return this.form.get('emailControl');
  }
  get userNameControl(){
    return this.form.get('userNameControl');
  }
  get firstNameControl(){
    return this.form.get('firstNameControl');
  }
  get middleNameControl(){
    return this.form.get('middleNameControl');
  }
  get lastNameControl(){
    return this.form.get('lastNameControl');
  }
  get addressControl(){
    return this.form.get('addressControl');
  }
  get dateControl(){
    return this.form.get('dateControl');
  }
  get bloodControl(){
    return this.form.get('bloodControl');
  }
  get animalControl(){
    return this.form.get('animalControl');
  }
  get selectFormControl(){
    return this.form.get('selectFormControl');
  }
  get hospitalFormControl(){
    return this.form.get('hospitalFormControl');
  }
  get passwordControl(){
    return this.form.get('passwordControl');
  }
  get retypepasswordControl(){
    return this.form.get('retypepasswordControl');
  }
  
  HospitalList: any;

  hospitals = [];
  bloods: BloodType[] = [
    {name: 'A positive', type: 'A positive'},
    {name: 'A negative', type: 'A negative'},
    {name: 'B positive', type: 'B positive'},
    {name: 'B negative', type: 'B negative'},
    {name: 'B negative', type: 'B negative'},
    {name: 'AB positive', type: 'AB positive'},
    {name: 'AB negative', type: 'AB negative'},
    {name: 'O positive', type: 'O positive'},
    {name: 'O negative', type: 'O negative'},
  ];


  ngOnInit() {

    // this.route.paramMap.subscribe(params =>{
    //   params.get('userKey');
    // });

    // this.userService.getUser(this.key).valueChanges().subscribe(data =>{
    //   this.user = data;
    // })
    this.userService.getUser(this.data).valueChanges().subscribe(theUser => {
      this.user = theUser;

      this.actived = this.user.activated;
      this.admin = this.user.admin;
      this.email = this.user.email;
      this.hospitalMember = this.selectedVal;
      this.hospitalKey = this.user.hospitalKey;
      this.firstName = this.user.firstName;
      this.middleName = this.user.middleName;
      this.lastName = this.user.lastName;
      this.bloodType = this.user.bloodType;
      this.date = this.user.date;
      this.password = this.user.password;
      this.userName = this.user.userName;
      this.userKey = this.user.userKey;
      this.address = this.user.address;
      this.gender = this.user.gender;

      this.bindNewValues();
      this.bindMember()
    });

    this.loadHospital();

  }


  async loadHospital() {
    

    this.HospitalList = await this.hospitalService.getHospitalList();
    await this.HospitalList.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        var y = element.payload.toJSON();
        
        
        
          if(y.Key == this.hospitalKey){
            this.hospitalName = y;
            
            this.bindNewValues();
          }
      
        this.hospitalList.push(y);
        

      })
 
      this.hospitals = this.hospitalList;
      
      console.log("The Hospitals is IS NOW ****** " +this.hospitals);
      console.log("The Hospitals is IS NOW ****** " + JSON.stringify(this.hospitals));
      console.log("The Bloods ********* " + JSON.stringify(this.bloods));
      this.bindNewValues();
    });
  }

  makeMeadmin = false;
 
  public onValChange(val) {

    this.selectedVal = val.toLowerCase() == 'true' ? true : false;
    if(val.toLowerCase() == "left"){
      this.makeMeadmin = true;
    }
    console.log("the Type is " + this.selectedVal);
    console.log("the Type is 2" + val);
  }

  memberType : any;
  bindMember(){
    
    if(this.user.hospitalMember){
      this.memberType = "true";
      this.selectedVal = true;
    }else{
      this.memberType = "false";
      this.selectedVal = false;
    }

    if(this.admin){
      this.memberType = "left";
      this.makeMeadmin = true;
    }else{
      this.makeMeadmin = false;
    }
  }

  selectedHospital(event) {


    this.selectedValueHospital = event.value.Key;
    console.log(this.selectedValueHospital);
  }


  onUpdate() {
    if(!this.selectedValueHospital){
      this.selectedValueHospital ="";
      this.selectedVal = false;
    }

    if(!this.selectedValue){
      this.selectedValue = this.bloodType;
    }
    var theNameofHospital = "";
    for(let check of this.HospitalList){
      if(this.selectedValueHospital == check.Key){
        theNameofHospital = check.Name;
      }
    }

    let user: Users = new Users(true,
      this.makeMeadmin, this.emailControl.value, this.selectedVal,
      this.selectedValueHospital,
      this.firstNameControl.value,
      this.middleNameControl.value,
      this.lastNameControl.value,
      this.selectedValue,
      this.dateControl.value,
      this.passwordControl.value,
      this.userNameControl.value,
      this.userKey,
      this.addressControl.value,
      this.genderControl.value,
      Date(),
      theNameofHospital
      );

    this.userService.update(user);

  }

  selected(event) {
   
    
    this.selectedValue = event.value.name;
    console.log(this.selectedValue + " is this the blood?");
}

bindNewValues(){
  
  
  console.log("The Array is " + JSON.stringify(this.bloods) + " The Object " + JSON.stringify(this.newBlood));
  console.log("The Hospitals " + this.hospitals + "The Object " + JSON.stringify(this.hospitalName));
  this.newBlood.name = this.bloodType as string;
  this.newBlood.type = this.bloodType as string;
  let myobjecttest = JSON.parse('{"name": "A positive", "type" : "A Positive"}');
  this.form = new FormGroup({
    firstNameControl : new FormControl(this.firstName,[Validators.required]),
    middleNameControl : new FormControl(this.middleName,[Validators.required]),
    lastNameControl : new FormControl(this.lastName,[Validators.required]),
    addressControl : new FormControl(this.address,[Validators.required]),
    bloodControl : new FormControl(myobjecttest, [Validators.required]),
    userNameControl : new FormControl(this.userName,[Validators.required]),
    // animalControl : new FormControl('', [Validators.required]),
    // selectFormControl : new FormControl('', Validators.required),
    hospitalFormControl : new FormControl(this.hospitalName,),
    dateControl : new FormControl(this.date,[Validators.required]),
    passwordControl : new FormControl(this.password,[Validators.required]),
    retypepasswordControl : new FormControl(this.password,[Validators.required,PasswordValidators.passwordMatch]),
    emailControl : new FormControl(this.email,[Validators.required, Validators.email]),
    genderControl : new FormControl(this.gender,[Validators.required])
  });
}

}

