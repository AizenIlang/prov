import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';

@Component({
  selector: 'app-appointmentsedit',
  templateUrl: './appointmentsedit.component.html',
  styleUrls: ['./appointmentsedit.component.scss']
})
export class AppointmentseditComponent implements OnInit {

  constructor(private appointmentService : AppointmentsService) { }

  ngOnInit() {
  }

}
