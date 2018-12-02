import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../Users';
import { UserService } from '../service/user.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HospitalService } from '../service/hospital.service';


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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute, private userService: UserService,
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

  selectedVal: boolean; // for hopsital member
  selectedValue: any; // for blood type;
  selectedValueHospital: any; //for hospital member;

  bloodControl = new FormControl('', [Validators.required]);
  // selectFormControl = new FormControl('', Validators.required);
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  hopsitalFormControl = new FormControl('', Validators.required);

  HospitalList: any;

  hospitals: any;
  bloods: BloodType[] = [
    { name: 'O', type: 'O' },
    { name: 'A', type: 'A' },
    { name: 'AB', type: 'AB' },
    { name: 'B', type: 'B' },
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

    });

    this.loadHospital();

  }


  async loadHospital() {
    var hospitalList = [];

    this.HospitalList = await this.hospitalService.getHospitalList();
    await this.HospitalList.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        var y = element.payload.toJSON();
        hospitalList.push(y);

      })
      console.log(hospitalList);
      this.hospitals = hospitalList;



    });
  }

  public onValChange(val) {

    this.selectedVal = val.toLowerCase() == 'true' ? true : false;

    console.log("the Type is " + this.selectedVal);
    console.log("the Type is 2" + val);
  }

  selectedHospital(event) {


    this.selectedValueHospital = event.value.Key;
    console.log(this.selectedValueHospital);
  }


  onUpdate() {


    let user: Users = new Users(true,
      false, this.email, this.selectedVal,
      this.selectedValueHospital,
      this.firstName,
      this.middleName,
      this.lastName,
      this.bloodType,
      this.date,
      this.password,
      this.userName,
      this.userKey,
      this.address);

    this.userService.update(user);

  }

}

