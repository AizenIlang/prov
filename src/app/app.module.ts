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
    UserlobbyComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,      
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBRL3GznzT9wyJqqyj4iG_l8V1DtvSKHyM'
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
      }
      

    ])


  ],
  providers: [
    UserService
    
  ],
  bootstrap: [AppComponent],
  entryComponents:[SignupComponent,
    AddhospitalComponent,
    EdituserComponent,
    AppointmentseditComponent,
    EdithospitalComponent]
})
export class AppModule { }
