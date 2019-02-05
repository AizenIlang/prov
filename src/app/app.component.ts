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
 
  ngOnInit() {

    

   
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
      userService.login();


     
  }

  reLogin(){

  }

  switchLogin(){
    this.router.navigate(['/login']);
  }


  logout(){
    
    this.userService.logout();
    swal("See you next time");
    this.router.navigate(['']);
  }

}
