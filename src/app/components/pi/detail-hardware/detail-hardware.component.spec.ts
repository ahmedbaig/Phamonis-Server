import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHardwareComponent } from './detail-hardware.component';

describe('DetailHardwareComponent', () => {
  let component: DetailHardwareComponent;
  let fixture: ComponentFixture<DetailHardwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailHardwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
