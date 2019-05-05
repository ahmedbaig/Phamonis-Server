import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHardwareComponent } from './list-hardware.component';

describe('ListHardwareComponent', () => {
  let component: ListHardwareComponent;
  let fixture: ComponentFixture<ListHardwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHardwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
