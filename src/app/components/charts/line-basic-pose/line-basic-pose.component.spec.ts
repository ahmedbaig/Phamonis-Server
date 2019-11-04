import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineBasicPoseComponent } from './line-basic-pose.component';

describe('LineBasicPoseComponent', () => {
  let component: LineBasicPoseComponent;
  let fixture: ComponentFixture<LineBasicPoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineBasicPoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineBasicPoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
