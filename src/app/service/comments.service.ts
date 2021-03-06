import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private db : AngularFireDatabase) { }


   getCommentHospital(key){
      return this.db.object('/Hospitals/'+key+'/Comments');
   }

   addCommentHospital(hopsitalKey,userKey){
     return this.db.object('Hospitals/'+hopsitalKey+'/Comments/'+userKey);
   }

   getComments(key){
     return this.db.list('/Hospitals/'+key+'/Comments');
   }

   getCommentsHospitalList(key){
     return this.db.list('/Hospitals/'+key+'/Comments');
   }
}
