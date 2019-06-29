import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JqxschedulerComponent } from './jqxscheduler.component';

describe('JqxschedulerComponent', () => {
  let component: JqxschedulerComponent;
  let fixture: ComponentFixture<JqxschedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JqxschedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JqxschedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
