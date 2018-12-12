import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../service/comments.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-addcomments',
  templateUrl: './addcomments.component.html',
  styleUrls: ['./addcomments.component.scss']
})
export class AddcommentsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private commentsService : CommentsService,
    private userService : UserService ) { }
  CommentsList:any;

  form = new FormGroup({
      message : new FormControl('',Validators.required),
    
  });

  ngOnInit() {
    this.commentsService.getCommentsHospitalList(this.data).valueChanges().subscribe(thedata =>{
      this.CommentsList = thedata;
    });
  }

  AddComment(){

  }

}
