import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminappointmentreportsComponent } from './adminappointmentreports.component';

describe('AdminappointmentreportsComponent', () => {
  let component: AdminappointmentreportsComponent;
  let fixture: ComponentFixture<AdminappointmentreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminappointmentreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminappointmentreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
