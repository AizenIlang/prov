import { Component, OnInit, } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  task: AngularFireUploadTask;
  // task : any;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  photos = [];
  isHovering: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private storage: AngularFireStorage,
    private db: AngularFireDatabase) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    //file obeject just get the first one
    // const file = event.item(0);

    Array.from(event).forEach(file => {
      if (file.type.split('/')[0] !== 'image') {
        swal("Not a supported Image");
        return;
      }
    });

    Array.from(event).forEach(file => {
      const path = `hospital/${this.data}/${new Date().getTime()}_${file.name}`;

      this.task = this.storage.upload(path, file);
      // .then(()=>{
      //   const ref = this.storage.ref(path);
      //   const DL = ref.getDownloadURL().subscribe(url=>{
      //     const Url = url;
      //     this.downloadURL = url;
      //     console.log(Url);
      //   })
      // });

      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges();

      this.task.then(t => {
        const ref = this.storage.ref(path);
        const DL = ref.getDownloadURL().subscribe(url => {
          const Url = url;
          this.downloadURL = url;
          this.photos.push(url);
          console.log(Url);
        })
        var key = this.db.createPushId();
        this.db.object('Images/' + this.data + '/' + key + '/image').set(path);
      });

    });
    //Validation
    // if(file.type.split('/')[0] !== 'image'){
    //   swal("Not a supported Image");
    //   return;
    // }

    //create the file path




  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  ngOnInit() {
  }

}
