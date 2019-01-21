import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validators';
import { Users } from '../Users';
import { UserService } from '../service/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SignupComponent } from '../signup/signup.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import * as firebase from 'firebase';
import swal from 'sweetalert';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  UN: any;
  PW: any;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace],
      UsernameValidators.shouldBeUnique
    ),
    password: new FormControl('', Validators.required)

  });


  invalidLogin: boolean;

  User: Users;
  UserList: any;




  constructor(private route: Router, private userService: UserService, private afAuth: AngularFireAuth
    , public dialog: MatDialog) { }

  ngOnInit() {


    this.userService.getUsers().valueChanges().subscribe(data => {
      this.UserList = data;
      console.log(this.UserList);
    });



  }

  login() {
    console.log("checking");
    for (let magic of this.UserList) {

      if (this.form.get('username').value === magic.userName) {

        this.UN = this.form.get('username').value;
        this.PW = magic.password;

        this.afAuth.auth.signInWithEmailAndPassword(magic.email.toString(), this.form.get('password').value).then(
          full => {
            if (full.user.emailVerified) {
              // swal("Great");
              this.setLogin(magic);
              

            } else {
              swal("Email is not Verified");
              firebase.auth().currentUser.sendEmailVerification().then(ful=>{
                  swal("Verification Email has been sent.");
              });
              
            }
          },
          rej => {
            swal("Username or Password is Invalid");
          }
        )
        //  if(){
        //       console.log("Logging IN... True");
        //       return;
        //  }
        //  if(this.PW == this.form.get('password').value){
        //     console.log(this.afAuth.auth.signInWithEmailAndPassword(magic.email.toString(),magic.password.toString()));
        //     localStorage.setItem('user', JSON.stringify({
        //       actived : magic.actived,
        //       admin : magic.admin,
        //       email : magic.email,
        //       hospitalMember : magic.hospitalMember,
        //       hospitalKey : magic.hospitalKey,
        //     firstName : magic.firstName,
        //     middleName : magic.middleName,
        //     lastName : magic.lastName,
        //     bloodType : magic.bloodType,
        //     date : magic.date,
        //     password : magic.password,
        //     userName : magic.userName              
        //     }));

        //    if(magic.admin){
        //     // this.route.navigate(['admin']);
        //     swal("Welcome back "+magic.firstName);
        //     this.route.navigate(['admin']);
        //     console.log("is admin");
        //     this.userService.isLoggedIn = true;
        //     this.userService.user = magic;
        //     return;
        //    }

        //    console.log("check if hospial membr" + magic.hospitalMember)
        //    if(magic.hospitalMember){
        //      this.route.navigate(['memberhospital']);
        //      this.userService.isLoggedIn = true;
        //      this.userService.user = magic;
        //     return;

        //    }
        //    this.userService.isLoggedIn = true;

        //    console.log("is not admin");
        //    this.route.navigate(['userlobby']);
        //    this.userService.isLoggedIn = true;
        //    this.userService.user = magic;
        //   return;
        //  }

      }
    }

   
  }

  setLogin(magic) {
    localStorage.setItem('user', JSON.stringify({
      actived: magic.actived,
      admin: magic.admin,
      email: magic.email,
      hospitalMember: magic.hospitalMember,
      hospitalKey: magic.hospitalKey,
      firstName: magic.firstName,
      middleName: magic.middleName,
      lastName: magic.lastName,
      bloodType: magic.bloodType,
      date: magic.date,
      password: magic.password,
      userName: magic.userName
    }));

    if (magic.admin) {
      // this.route.navigate(['admin']);
      swal("Welcome back " + magic.firstName);
      this.route.navigate(['admin']);
      console.log("is admin");
      this.userService.isLoggedIn = true;
      this.userService.user = magic;
      return;
    }

    console.log("check if hospial membr" + magic.hospitalMember)
    if (magic.hospitalMember) {
      this.route.navigate(['memberhospital']);
      this.userService.isLoggedIn = true;
      this.userService.user = magic;
      return;

    }
    this.userService.isLoggedIn = true;

    console.log("is not admin");
    this.route.navigate(['userlobby']);
    this.userService.isLoggedIn = true;
    this.userService.user = magic;
    return;
  }




  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  onCreate() {

    this.dialog.open(SignupComponent);
  }
  ResetPass() {
    this.dialog.open(ResetpasswordComponent);
  }


}
