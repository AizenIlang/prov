import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Users } from '../Users';
import swal from 'sweetalert';
import { map, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,
     private route : Router) { }

  getUsers() {
    return this.db.list('/Users');
  }

  getUser(key) {
    return this.db.object('/Users/' + key);
  }

  login() {
    if(localStorage.getItem("user")){
      let theUser = JSON.parse(localStorage.getItem("user"));
      console.log("trying to get the user : " + theUser.firstName);
      this.isLoggedIn = true;
      this.user = theUser;

      if (this.user.admin) {
        // this.route.navigate(['admin']);
        swal("Welcome back " + this.user.firstName);
        this.route.navigate(['admin']);
        console.log("is admin");
        this.isLoggedIn = true;
        
        return;
      }
  
      console.log("check if hospial membr" + this.user.hospitalMember)
      if (this.user.hospitalMember) {
        this.route.navigate(['memberhospital']);
        this.isLoggedIn = true;
        
        return;
  
      }
      this.isLoggedIn = true;
  
      console.log("is not admin");
      this.route.navigate(['userlobby']);
      this.isLoggedIn = true;
      
      return;



    }
    
  }


  setLogin(magic) {
    localStorage.setItem('user', JSON.stringify({
      actived: magic.actived,
      admin: magic.admin,
      email: magic.email,
      hospitalMember: magic.hospitalMember,
      hospitalKey: magic.hospitalKey,
      firstName: magic.firstName,
      middleName: magic.middleName,
      lastName: magic.lastName,
      bloodType: magic.bloodType,
      date: magic.date,
      password: magic.password,
      userName: magic.userName
    }));

    if (magic.admin) {
      // this.route.navigate(['admin']);
      swal("Welcome back " + magic.firstName);
      this.route.navigate(['admin']);
      console.log("is admin");
      this.isLoggedIn = true;
      this.user = magic;
      return;
    }

    console.log("check if hospial membr" + magic.hospitalMember)
    if (magic.hospitalMember) {
      this.route.navigate(['memberhospital']);
      this.isLoggedIn = true;
      this.user = magic;
      return;

    }
    this.isLoggedIn = true;

    console.log("is not admin");
    this.route.navigate(['userlobby']);
    this.isLoggedIn = true;
    this.user = magic;
    return;
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

  add(act: boolean, adm: boolean, ema: String, hospitalMember: boolean, hospitalKey: String, fn: String, mn: String, ln: String, bt: String, dt: String, pw: String, un: String, uk: String,add : String, gen : String,created : String, hospName: String) {

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
      created,
      hospName);

      

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
    localStorage.clear();
    this.afAuth.auth.signOut();
    
  }

  delete(key){
    this.db.object('Users/'+key).remove().then(full=>{
      swal("User Deleted");
    })
  }

  getTotalGenderArray() {
    var male = 0;
    var female = 0;
    let userList : any;
    this.getUsers().valueChanges().subscribe(user=>{
      userList = user;
      console.log("Check the users gender" + JSON.stringify(userList));
      for(let tempUser of userList){
        console.log("Getting itterated? " +tempUser.gender);
        if(tempUser.gender == "Male"){
          male++;
          console.log("added the male?" +male);
        }else{
          female++;
          console.log("added the female?" +female);
        }
      }
      
    })
    
  }

  verificationEmail(){
    
  }


}
