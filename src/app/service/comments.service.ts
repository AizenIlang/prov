import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private db : AngularFireDatabase) { }


   getCommentHospital(key){
      return this.db.object('/Hospital/'+key+'/Comments');
   }
}
