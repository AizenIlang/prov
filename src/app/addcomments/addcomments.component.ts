import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../service/comments.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
import { Inject } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { UserService } from '../service/user.service';
import { AngularFireDatabase } from '@angular/fire/database';



@Component({
  selector: 'app-addcomments',
  templateUrl: './addcomments.component.html',
  styleUrls: ['./addcomments.component.scss']
})
export class AddcommentsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private commentsService : CommentsService,
    private userService : UserService ,public dialogRef: MatDialogRef<AddcommentsComponent>,
    private db : AngularFireDatabase) { }
  CommentsList:any;
  rate;

  form = new FormGroup({
      message : new FormControl('',Validators.required),
    
  });

  ngOnInit() {
    this.commentsService.getCommentsHospitalList(this.data).valueChanges().subscribe(thedata =>{
      this.CommentsList = thedata;
    });
  }

  Close(){
    this.dialogRef.close();
  }

  get message(){
    return this.form.get('message');
  }

  AddComment(){
      console.log(this.rate);
      let comments = new Comments(true,this.message.value,
        this.userService.user.firstName + " " + this.userService.user.lastName,
        this.rate,
        this.userService.user.userKey);
       
       let CommentsConnect = this.commentsService.addCommentHospital(this.data,this.userService.user.userKey);
       CommentsConnect.set(comments).then(fulfilled =>{
          swal("Your comment has been added");
        }, rejected =>{
          swal("Failed to add " +rejected.message);
        });
      
  }

}


export class Comments{
    approved : boolean;
    message : String;
    name : String;
    rate : number;
    uid: String;

    constructor(ap : boolean, msg : String, nm : String, rt : number, uid : String){
        this.approved = ap;
        this.message = msg;
        this.name = nm;
        this.rate = rt;
        this.uid = uid;
    }
 
}
