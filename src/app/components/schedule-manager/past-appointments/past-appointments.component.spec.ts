import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAppointmentsComponent } from './past-appointments.component';

describe('PastAppointmentsComponent', () => {
  let component: PastAppointmentsComponent;
  let fixture: ComponentFixture<PastAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
