import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { defineBase } from '@angular/core/src/render3';
import { ImagestorageService } from '../service/imagestorage.service';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-delete-multitple',
  templateUrl: './delete-multitple.component.html',
  styleUrls: ['./delete-multitple.component.scss']
})
export class DeleteMultitpleComponent implements OnInit {

  files = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private storage : AngularFireStorage, private db : AngularFireDatabase,
  private serviceImage : ImagestorageService,
  public dialog: MatDialog) { }

  theData =[];
  theURL = [];
  ngOnInit() {
    this.GetFiles();
  }

  GetFiles(){
    this.serviceImage.getImagesRef(this.data).valueChanges().subscribe(data=>{
      this.theData = data;
      this.GetURL();
    });

    
    
  }

  GetURL(){
    for(let x of this.theData){
      console.log(x);
      let tempImage : TheImage;
      tempImage = new TheImage();
      tempImage.image = x.image;
      console.log("The Temp Image :" +tempImage.image);
      this.storage.ref(tempImage.image).getDownloadURL().subscribe(data =>{
        tempImage.url = data;
        tempImage.key = x.key;
        console.log("Get the Key :" +x.key);
        this.theURL.push(tempImage);
      })
    }
    
  }

  DeleteImage(theRef){
    this.serviceImage.deleteImage(this.data,theRef);
    this.dialog.closeAll();
  }

 



}
export class TheImage{
  image : any;
  url : any;
  key : any;
}