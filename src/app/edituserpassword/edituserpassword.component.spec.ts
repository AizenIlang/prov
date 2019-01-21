import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserpasswordComponent } from './edituserpassword.component';

describe('EdituserpasswordComponent', () => {
  let component: EdituserpasswordComponent;
  let fixture: ComponentFixture<EdituserpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituserpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
