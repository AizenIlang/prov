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
  isLoggedIn = false;
  hospitalName = "";

  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
       
        return null;
      } else {
        this.User = JSON.parse(localStorage.getItem('user'));
        this.isAdmin = this.User.admin;
        this.user = this.User;
        this.isLoggedIn = true;
        return authState.uid;
      }

    })


  )

  add(act: boolean, adm: boolean, ema: String, hospitalMember: boolean, hospitalKey: String, fn: String, mn: String, ln: String, bt: String, dt: String, pw: String, un: String, uk: String,add : String, gen : String,created : String) {

    let user: Users = new Users(act,
      adm, ema, hospitalMember,
      "",
      fn,
      mn,
      ln,
      bt,
      dt,
      pw,
      un,
      uk,
      add,
      gen,
      created);

      

   let makeAuth =  this.afAuth.auth.createUserWithEmailAndPassword(user.email.toString(), user.password.toString())
     makeAuth .then(reason => {
      const theID = this.afAuth.auth.currentUser.uid;
      user.userKey = theID;
      this.db.object('/Users/' + theID).set(user);
      swal("Good job!", "User " + user.userName + " Created", "success");
      console.log(makeAuth);
    }, prom => {
      swal("Not good... " +prom);
    });
  }

  update(user){
      this.db.object('/Users/'+user.userKey).update(user).then(ful =>{
          swal("Update Complete");
      }, didnot => {
        swal(didnot);
      });
  }

  logout(){
    this.isAdmin = observableOf(false);
    this.isLoggedIn = false;
    this.user = null;
    this.afAuth.auth.signOut();
    
  }

  verificationEmail(){
    
  }


}
