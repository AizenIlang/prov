import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentassigndoctorComponent } from './appointmentassigndoctor.component';

describe('AppointmentassigndoctorComponent', () => {
  let component: AppointmentassigndoctorComponent;
  let fixture: ComponentFixture<AppointmentassigndoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentassigndoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentassigndoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
