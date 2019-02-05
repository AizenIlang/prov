import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EdituserComponent} from '../edituser/edituser.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public userService : UserService,public dialog: MatDialog) { }

  user : any;

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
  genderControl: String;

  ngOnInit() {

    
           
    
  }

  editUser(theKey){
    let dialogRef = this.dialog.open(EdituserComponent, {
      data : theKey,
      height : '500px'
    });
    
  }

}
