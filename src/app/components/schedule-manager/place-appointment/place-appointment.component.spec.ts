import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAppointmentComponent } from './place-appointment.component';

describe('PlaceAppointmentComponent', () => {
  let component: PlaceAppointmentComponent;
  let fixture: ComponentFixture<PlaceAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
