import { Component, OnInit } from '@angular/core';

import { UserService } from './service/user.service';
import {Router } from '@angular/router';
import { MessagingService } from "./messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'material-ng';
  opened: boolean;

  Users$;
  Users;

  //For Adding

  //Notification
  message;

  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
    console.log("re instate");
  }

  relaunchNotif(){
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }
  
  constructor(public userService : UserService, private router : Router,
    private msgService : MessagingService){
      this.Users$ = userService.getUsers();
      // userSvalueChanges().subscribe(Users => {
      //   this.Users = Users;
      // });
      
      userService.getUsers().valueChanges().subscribe(data =>{
        this.Users = data;
      });



     
  }

  logout(){
    
    this.userService.logout();
    swal("See you next time");
    this.router.navigate(['']);
  }

}
