import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Users } from '../Users';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  constructor(private route : ActivatedRoute, private userService : UserService) { }
  user : any;
  key : string;
  ngOnInit() {

    this.route.paramMap.subscribe(params =>{
      params.get('userKey');
    });

    this.userService.getUser(this.key).valueChanges().subscribe(data =>{
      this.user = data;
    })

  }

}
