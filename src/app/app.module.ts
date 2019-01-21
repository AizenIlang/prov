import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from './material';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UserService} from './service/user.service';
import { AdminComponent } from './admin/admin.component';
import { MemberhospitalComponent } from './memberhospital/memberhospital.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AddhospitalComponent} from './addhospital/addhospital.component';
import { AppointmentseditComponent } from './appointmentsedit/appointmentsedit.component';
import { EdithospitalComponent } from './edithospital/edithospital.component';
import { UserlobbyComponent } from './userlobby/userlobby.component';
import { AgmCoreModule } from '@agm/core';
import { AddcommentsComponent } from './addcomments/addcomments.component';
import { BarRatingModule } from "ngx-bar-rating";
import { DoctorsaddComponent } from './doctorsadd/doctorsadd.component';
import { AppointmentassigndoctorComponent } from './appointmentassigndoctor/appointmentassigndoctor.component';
import {MatRadioModule} from '@angular/material/radio';
import { EdituserpasswordComponent } from './edituserpassword/edituserpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { HospitalreportsComponent } from './reports/hospitalreports/hospitalreports.component';
import { UserreportsComponent } from './reports/userreports/userreports.component';
import { AppointmentreportsComponent } from './reports/appointmentreports/appointmentreports.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ImageService } from './service/image.service';
import {HttpClientModule} from '@angular/common/http';
import { AdminappointmentreportsComponent } from './reports/adminappointmentreports/adminappointmentreports.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    AdminComponent,
    MemberhospitalComponent,
    EdituserComponent,
    AddhospitalComponent,
    AppointmentseditComponent,
    EdithospitalComponent,
    UserlobbyComponent,
    AddcommentsComponent,
    DoctorsaddComponent,
    AppointmentassigndoctorComponent,
    EdituserpasswordComponent,
    ProfileComponent,
    HospitalreportsComponent,
    UserreportsComponent,
    AppointmentreportsComponent,
    ResetpasswordComponent,
    AdminappointmentreportsComponent
    
  ],
  imports: [
    HttpClientModule,
    BarRatingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,      
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1_Zoh07zVan9-XAloa_xSUV27DJQvyj8'
    }),
    RouterModule.forChild([
      {
        path : '',
        component : HomeComponent
      },

      {
        path : 'home',
        component : HomeComponent
      },

      {
        path : 'login',
        component : LoginComponent
      },

      {
        path : 'admin',
        component : AdminComponent
      },

      {
        path : 'memberhospital',
        component : MemberhospitalComponent
      },

      {
        path : 'edituser/:userkey',
        component : EdituserComponent
      },

      {
        path : 'userlobby',
        component : UserlobbyComponent
      },

      {
        path : 'profile',
        component : ProfileComponent
      },
      {
        path : 'hospitalreport',
        component : HospitalreportsComponent
      },
      {
        path : 'reportsappointment',
        component : AppointmentreportsComponent
      },
      {
        path : 'adminappointmentreport',
        component : AdminappointmentreportsComponent
      },
      {
        path : 'userreports',
        component : UserreportsComponent
      }
      

    ])


  ],
  providers: [
    UserService,
    ImageService
  ],
  bootstrap: [AppComponent],
  entryComponents:[SignupComponent,
    AppointmentassigndoctorComponent,
    AddhospitalComponent,
    EdituserComponent,
    AppointmentseditComponent,
    EdithospitalComponent,
    AddcommentsComponent,
    DoctorsaddComponent,
    ResetpasswordComponent]
})
export class AppModule { }
