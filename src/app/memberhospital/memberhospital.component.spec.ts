import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberhospitalComponent } from './memberhospital.component';

describe('MemberhospitalComponent', () => {
  let component: MemberhospitalComponent;
  let fixture: ComponentFixture<MemberhospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberhospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberhospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
