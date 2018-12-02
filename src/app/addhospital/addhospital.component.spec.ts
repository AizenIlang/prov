import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhospitalComponent } from './addhospital.component';

describe('AddhospitalComponent', () => {
  let component: AddhospitalComponent;
  let fixture: ComponentFixture<AddhospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddhospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
