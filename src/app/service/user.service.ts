import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Users } from '../Users';
import swal from 'sweetalert';
import { map, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  getUsers() {
    return this.db.list('/Users');
  }

  getUser(key) {
    return this.db.object('/Users/' + key);
  }

  login() {

  }

  isAdmin = observableOf(false);
  User;
  user;
  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        this.User = JSON.parse(localStorage.getItem('user'));
        this.isAdmin = this.User.admin;
        this.user = this.User;
        return authState.uid;
      }

    })


  )

  add(act: boolean, adm: boolean, ema: String, hospitalMember: boolean, hospitalKey: String, fn: String, mn: String, ln: String, bt: String, dt: String, pw: String, un: String, uk: String,add : String) {

    let user: Users = new Users(act,
      adm, ema, hospitalMember,
      "",
      fn,
      mn,
      ln,
      "",
      dt,
      pw,
      un,
      uk,
      add);


    this.afAuth.auth.createUserWithEmailAndPassword(user.email.toString(), user.password.toString())
      .then(reason => {
        const theID = this.db.createPushId();
        user.userKey = theID;
        this.db.object('/Users/' + theID).set(user);
        swal("Good job!", "User " + user.userName + " Created", "success");

      }, prom => {

      });
  }

  logout(){
    this.isAdmin = observableOf(false);
    this.user = null;
    this.afAuth.auth.signOut();
    
  }


}
