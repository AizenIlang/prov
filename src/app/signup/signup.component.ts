import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import { UserService } from '../service/user.service';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {PasswordValidators} from '../common/validators/password.validators';
import { UsernameValidators } from '../login/username.validators';




export interface BloodType {
  name: string;
  type: string;
}
export interface Animal {
  name: string;
  sound: string;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({
    firstNameControl : new FormControl('',[Validators.required,Validators.minLength(2),Validators.pattern('[A-Z]+[a-z]+')]),
    middleNameControl : new FormControl('',[Validators.required,Validators.minLength(2),Validators.pattern('[A-Z]+[a-z]+')]),
    lastNameControl : new FormControl('',[Validators.required,Validators.minLength(2),Validators.pattern('[A-Z]+[a-z]+')]),
    userNameControl : new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('[A-Z]+[a-zA-Z0-9]+')],
    UsernameValidators.shouldBeUnique),
    addressControl : new FormControl('',[Validators.required,Validators.minLength(8)]),
    dateControl : new FormControl('',[Validators.required]),
    passwordControl : new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('[A-Za-z0-9]+')]),
    
    retypepasswordControl : new FormControl('',[Validators.required,Validators.minLength(8),
  PasswordValidators.passwordMatch]),
    emailControl : new FormControl('',[Validators.required,Validators.email]),
    bloodControl : new FormControl('', [Validators.required]),
    genderControl : new FormControl('',Validators.required),

  });
    get animalControl(){
      return this.form.get('animalControl');
    }
    get selectFormControl(){
      return this.form.get('selectFormControl');
    }
    get genderControl(){
      return this.form.get('genderControl');
    }

    get bloodControl(){
      return this.form.get('bloodControl');
    }
    get addressControl(){
      return this.form.get('addressControl');
    }

    get dateControl(){
      return this.form.get('dateControl');
    }

    get passwordControl(){
      return this.form.get('passwordControl');
    }

    get retypepasswordControl(){
      return this.form.get('retypepasswordControl');
    }

    get emailControl(){
      return this.form.get('emailControl');
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

    get userNameControl(){
      return this.form.get('userNameControl');
    }
 

  actived;
  admin;
  email;
  hospitalMember : boolean;
  hospitalKey : String;
  firstName : String;
  middleName : String;
  lastName : String;
  bloodType : String;
  date : String;
  password : String;
  userName : String;
  userKey : String;
  address : String;
  selectedValue : String;
  selectedGender : String;
  
  // selectFormControl = new FormControl('', Validators.required);
  retypepassword : String;

  pickGender: string;
  genders: string[] = ['Male', 'Female'];


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


  
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];
  
  constructor(private dialog : MatDialog, private userService : UserService) {

    
   }
   log(x){console.log(x)};
  ngOnInit() {
    
  }

  onSignUp(){

    console.warn(this.form.value);

    

    this.userService.add(
      false,
      false,
      this.emailControl.value,
      false,
      "",
      this.firstNameControl.value,
      this.middleNameControl.value,
      this.lastNameControl.value,
      this.selectedValue,
      this.dateControl.value,
      this.passwordControl.value,
      this.userNameControl.value,
      "",
      this.addressControl.value,
      this.genderControl.value,
      Date(),
      "");
      this.dialog.closeAll();


  }

  selected(event) {
   
    
    this.selectedValue = event.value.name;
    console.log(this.selectedValue);
}

  selectedGenderpick(event){
    this.selectedGender = event.value;
  }


}
