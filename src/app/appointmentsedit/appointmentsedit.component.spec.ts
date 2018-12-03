import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentseditComponent } from './appointmentsedit.component';

describe('AppointmentseditComponent', () => {
  let component: AppointmentseditComponent;
  let fixture: ComponentFixture<AppointmentseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
