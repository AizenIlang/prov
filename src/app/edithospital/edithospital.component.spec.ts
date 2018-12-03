import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithospitalComponent } from './edithospital.component';

describe('EdithospitalComponent', () => {
  let component: EdithospitalComponent;
  let fixture: ComponentFixture<EdithospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdithospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdithospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
