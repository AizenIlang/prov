import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlobbyComponent } from './userlobby.component';

describe('UserlobbyComponent', () => {
  let component: UserlobbyComponent;
  let fixture: ComponentFixture<UserlobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
