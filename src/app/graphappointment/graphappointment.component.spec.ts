import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphappointmentComponent } from './graphappointment.component';

describe('GraphappointmentComponent', () => {
  let component: GraphappointmentComponent;
  let fixture: ComponentFixture<GraphappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
