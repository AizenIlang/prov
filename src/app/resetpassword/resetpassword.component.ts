import { Component, OnInit } from '@angular/core';
import { FirebaseserviceService } from '../service/firebaseservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private firebaseService : FirebaseserviceService) { }
  form = new FormGroup({
    email : new FormControl('', [Validators.email,Validators.required])
  });

  get email(){
    return this.form.get('email');
  }

  ngOnInit() {

  }

  onResetPass(){
    this.firebaseService.resetPassword(this.form.get('email').value);
    
  }


}
