import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHardwareComponent } from './create-hardware.component';

describe('CreateHardwareComponent', () => {
  let component: CreateHardwareComponent;
  let fixture: ComponentFixture<CreateHardwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHardwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
