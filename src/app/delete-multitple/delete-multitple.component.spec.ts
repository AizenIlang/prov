import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMultitpleComponent } from './delete-multitple.component';

describe('DeleteMultitpleComponent', () => {
  let component: DeleteMultitpleComponent;
  let fixture: ComponentFixture<DeleteMultitpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMultitpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMultitpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
