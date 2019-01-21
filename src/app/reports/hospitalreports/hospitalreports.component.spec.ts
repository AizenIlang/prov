import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalreportsComponent } from './hospitalreports.component';

describe('HospitalreportsComponent', () => {
  let component: HospitalreportsComponent;
  let fixture: ComponentFixture<HospitalreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
