import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImagestorageService {

  constructor(private storage : AngularFireStorage, private db : AngularFireDatabase) { }

  getImagesRef(hospitalKey){
    
    return this.db.list('Images/'+hospitalKey);
  }

  getImagesURL(thePath){
    return this.storage.ref(thePath);
  }

  deleteImage(hospitalKey,imageKey){
    this.db.object('Images/'+hospitalKey+"/"+imageKey).remove();
  }


}
