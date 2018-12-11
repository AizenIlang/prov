import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import { UserService } from '../service/user.service';
import {FormControl, Validators, FormGroup} from '@angular/forms';



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
    firstNameControl : new FormControl('',[Validators.required,Validators.minLength(2)]),
    middleNameControl : new FormControl('',[Validators.required,Validators.minLength(2)]),
    lastNameControl : new FormControl('',[Validators.required,Validators.minLength(2)]),
    userNameControl : new FormControl('',[Validators.required,Validators.minLength(8)]),
    addressControl : new FormControl('',[Validators.required,Validators.minLength(8)]),
    dateControl : new FormControl('',Validators.required),
    passwordControl : new FormControl('',[Validators.required,Validators.minLength(8)]),
    retypepasswordControl : new FormControl('',[Validators.required,Validators.minLength(8)]),
    emailControl : new FormControl('',[Validators.required,Validators.email]),
    bloodControl : new FormControl('', [Validators.required])
  });

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
  
  // selectFormControl = new FormControl('', Validators.required);
  retypepassword : String;


  bloods: BloodType[] = [
    {name: 'O', type: 'O'},
    {name: 'A', type: 'A'},
    {name: 'AB', type: 'AB'},
    {name: 'B', type: 'B'},
  ];


  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];
  
  constructor(private dialog : MatDialog, private userService : UserService) {

    
   }

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
      this.addressControl.value);
      this.dialog.closeAll();


  }

  selected(event) {
   
    
    this.selectedValue = event.value.name;
    console.log(this.selectedValue);
}



}
