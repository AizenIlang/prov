import { Component } from '@angular/core';

import { UserService } from './service/user.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-ng';
  opened: boolean;

  Users$;
  Users;

  //For Adding


  constructor(public userService : UserService, private router : Router){
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
