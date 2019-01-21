import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FirebaseserviceService {

  constructor(private afAuth : AngularFireAuth) { }

  resetPassword(email : string){

    this.afAuth.auth.sendPasswordResetEmail(email,null).then(full=>{
      swal("Reset Password Link has been sent to your Email " + email);
    },rej =>{
      swal(rej);
    });
  }
}
