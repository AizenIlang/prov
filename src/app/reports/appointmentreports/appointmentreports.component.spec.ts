import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentreportsComponent } from './appointmentreports.component';

describe('AppointmentreportsComponent', () => {
  let component: AppointmentreportsComponent;
  let fixture: ComponentFixture<AppointmentreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
