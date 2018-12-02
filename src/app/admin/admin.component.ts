import { Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SignupComponent} from '../signup/signup.component';
import { UserService } from '../service/user.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { MatTabChangeEvent } from '@angular/material';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'; 
import {Observable} from 'rxjs';
import { AddhospitalComponent } from '../addhospital/addhospital.component';
import {EdituserComponent} from '../edituser/edituser.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  UserList : any;
  HospitalList : any;
  checkMe : any;

  choiceisUser = true;
  choiceisHopital = false;

  displayedColumns: string[] = ['userName','email','bloodType','date','firstName','middleName','lastName','actionsColumn'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any;

  displayedColumnsHospital: string[] = ['Name','Address','ContactNumber','Email'];
  columnsToDisplayHospital: string[] = this.displayedColumnsHospital.slice();
  dataHospital: any;


  //ANGUAR FIRE STORAGE USAGE
  task : AngularFireUploadTask;

  percentage : Observable<number>;

  snapshot : Observable<any>;

  downloadURL : Observable<string>;

  isHovering : boolean;



  //END OF USAGE

  constructor(public dialog: MatDialog, private userService : UserService, private hospitalService : HospitalService, private router : Router) {


    this.checkMe = JSON.parse(localStorage.getItem('user'));
    if(!this.checkMe.admin){
      console.log(!this.checkMe.admin);
      this.router.navigate(['']);
    }
      
   }


   //STORAGE UPLOAD

   



  async ngOnInit() {
    this.userService.getUsers().valueChanges().subscribe(data=>{
      this.UserList;
    });


    
    this.changeUsers();

  
  }

  AddUser(){
    this.dialog.open(SignupComponent);
  }

  AddHospital(){
    this.dialog.open(AddhospitalComponent);
  }

  

  changeUsers(){
    this.choiceisUser = true;
    this.choiceisHopital = false;
    console.log(this.choiceisHopital);
    this.displayedColumns = ['userName','email','bloodType','date','firstName','middleName','lastName','actionsColumn'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadUsers();
  }

  changeHospital(){
    this.choiceisUser = false;
    this.choiceisHopital = true;
    console.log(this.choiceisHopital);
    this.displayedColumns = ['Name','Address','ContactNumber','Email'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadHospital();
    
  }

  async loadUsers(){
    var userManagerList= [];

    this.UserList =  await this.userService.getUsers();
    await this.UserList.snapshotChanges().subscribe(item =>{
      item.forEach(element => {
        var y = element.payload.toJSON();
        userManagerList.push(y);
 
      })
      console.log(userManagerList);
      this.data = new MatTableDataSource(userManagerList);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
      
    });
  }

  async loadHospital(){
    var hospitalList= [];

    this.HospitalList =  await this.hospitalService.getHospitalList();
    await this.HospitalList.snapshotChanges().subscribe(item =>{
      item.forEach(element => {
        var y = element.payload.toJSON();
        hospitalList.push(y);

      })
      console.log(hospitalList);
      this.dataHospital = new MatTableDataSource(hospitalList);
      this.dataHospital.sort = this.sort;
      this.dataHospital.paginator = this.paginator;

      
      
    });
  }

  applyFilter(filterValue: string) {
    if(this.choiceisHopital){
      this.dataHospital.filter = filterValue.trim().toLowerCase();
    }else{
      this.data.filter = filterValue.trim().toLowerCase();
    }
    
  }

  changeUser(){

  }

  onLinkClick(event: MatTabChangeEvent) {
    if(event.index == 0){
        this.changeUsers();
    }
    if(event.index == 1){
      this.changeHospital();
    }
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
  
    // this.router.navigate(['contacts']); 
  }

  editUser(theKey){
    let dialogRef = this.dialog.open(EdituserComponent, {
      data : theKey
    });
    
  }

}



