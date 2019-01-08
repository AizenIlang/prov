import { Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SignupComponent} from '../signup/signup.component';
import { UserService } from '../service/user.service';
import { MatTableDataSource, MatSort, MatPaginator,MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { MatTabChangeEvent } from '@angular/material';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'; 
import {Observable} from 'rxjs';
import { AddhospitalComponent } from '../addhospital/addhospital.component';
import {EdituserComponent} from '../edituser/edituser.component';
import {EdithospitalComponent} from '../edithospital/edithospital.component';
import swal from 'sweetalert2';
import {Chart } from 'chart.js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  UserList : any;
  HospitalList : any;
  checkMe : any;

  choiceisUser = true;
  choiceisHopital = false;

  displayedColumns: string[] = ['userName','email','admin','hospitalMember','bloodType','date','firstName','middleName','lastName','actionsColumn'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any;

  displayedColumnsHospital: string[] = ['Name','Address','ContactNumber','Email','actionsColumn'];
  columnsToDisplayHospital: string[] = this.displayedColumnsHospital.slice();
  dataHospital: any;


  //ANGUAR FIRE STORAGE USAGE
  task : AngularFireUploadTask;

  percentage : Observable<number>;

  snapshot : Observable<any>;

  downloadURL : Observable<string>;

  isHovering : boolean;



  //END OF USAGE

  //USAGE FOR CHART
  
  chartUser = [];
  //END OF USAGE FOR CHART

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
    this.displayedColumns = ['userName','email','admin','hospitalMember','bloodType','date','firstName','middleName','lastName','actionsColumn'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadUsers();
  }

  changeHospital(){
    this.choiceisUser = false;
    this.choiceisHopital = true;
    console.log(this.choiceisHopital);
    this.displayedColumns = ['Name','Address','ContactNumber','Email','actionsColumn'];
    this.columnsToDisplay = this.displayedColumns.slice();

    this.loadHospital();
    
  }

  changeTools(){
    this.chartUser = new Chart(
      'canvasUser',
      {type : 'doughnut',
      data :{
        datasets: [{
          data : [10,20,30,10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ]
        }],
        labels: [
          '1st Week',
          '2nd Week',
          '3rd Week',
          '4th Week'
        ]
      },
      options :{
        xAxes : [{
          display: true
        }],
        yAxes : [{
          display: true
        }]
      }
    
      });
  }

  async loadUsers(){
    var userManagerList= [];
    
    
    this.data = new MatTableDataSource(userManagerList);
    this.UserList =  await this.userService.getUsers();
    await this.UserList.snapshotChanges().subscribe(item =>{
      userManagerList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        userManagerList.push(y);
 
      })
      console.log(userManagerList + "The user Manager") ;
      
      this.data = new MatTableDataSource(userManagerList);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
      
    });
  }

  //NOT BEING USED YET
  resetTableUserTable(){
    
    this.data.data = [];
    this.table.renderRows();
  }

  async loadHospital(){
    var hospitalList= [];

    this.dataHospital = new MatTableDataSource(hospitalList);   
    this.HospitalList =  await this.hospitalService.getHospitalList();
    await this.HospitalList.snapshotChanges().subscribe(item =>{
      hospitalList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        hospitalList.push(y);
        this.dialog.closeAll();
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

    if(event.index == 2){
      this.changeTools();
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

  editHospital(key){
    let dialogRef = this.dialog.open(EdithospitalComponent, {
      data : key
    });
  }

  removeHospital(key){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Hospital file!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true     
    })
    .then((willDelete) => {
      if (willDelete.value) {
         this.hospitalService.deleteHospital(key);
        swal({title:"Poof! Your Hospital file has been deleted!",
          type: "success",
        });
      } else {
        swal("Your Hospital file is safe!");
      }
    });

    // swal({
    //   title: "Are you sure?",
    //   text: "Once deleted, you will not be able to recover this Appointment file!",
    //   icon: 'warning',
    //   buttons: {
    //     cancel: "Cancel",
    //     confirm: {
    //       text : "Confirm",
    //       value : true
    //     },
    //   }, 
    // })
    // .then((value) => {
    //   console.log(value);
    //   if (value) {
    //     this.hospitalService.deleteHospital(key);
        
    //     swal({title:"Poof! Your Hospital file has been deleted!",
    //       type: "success",
    //     });
    //   } else {
    //     swal("Your Hospital file is safe!");
    //   }
    // });
  }

  reportUsersWeekly(){
    
    this.chartUser = new Chart(
      'canvasUser',
      {type : 'doughnut',
      data :{
        datasets: [{
          data : [10,20,30,10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ]
        }],
        labels: [
          '1st Week',
          '2nd Week',
          '3rd Week',
          '4th Week'
        ]
      },
      options :{
        xAxes : [{
          display: true
        }],
        yAxes : [{
          display: true
        }]
      }
    
      });

  }

  reportUsersMonthly(){
    this.chartUser = new Chart(
      'canvasUser',
      {type : 'line',
      data :{
        datasets: [{
          data : [10,20,30,10,2,4,10,0,0,2,32,3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ]
        }],
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      },
      options :{
        xAxes : [{
          display: true
        }],
        yAxes : [{
          display: true
        }]
      }
    
      });

  }


  reportUsersYearly(){
    this.chartUser = new Chart(
      'canvasUser',
      {type : 'bar',
      data :{
        datasets: [{
          data : [0,0,23,4],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ]
        }],
        labels: [
          '2016',
          '2017',
          '2018',
          '2019'
        ]
      },
      options :{
        xAxes : [{
          display: true
        }],
        yAxes : [{
          display: true
        }]
      }
    
      });

  }

}



