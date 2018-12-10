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
    firstName: new FormControl(),
    middleName: new FormControl(),
    lastName: new FormControl(),
    userName: new FormControl(),
    address: new FormControl(),
    date: new FormControl(),
    password: new FormControl(),
    retypepassword: new FormControl(),
    email : new FormControl()

  })

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
  bloodControl = new FormControl('', [Validators.required]);
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
    this.userService.add(
      false,
      false,
      this.email,
      false,
      "",
      this.firstName,
      this.middleName,
      this.lastName,
      this.selectedValue,
      this.date,
      this.password,
      this.userName,
      "",
      this.address);


  }

  selected(event) {
   
    
    this.selectedValue = event.value.name;
    console.log(this.selectedValue);
}

}
