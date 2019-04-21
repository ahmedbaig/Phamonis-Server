import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDiagnosisComponent } from './upload-diagnosis.component';

describe('UploadDiagnosisComponent', () => {
  let component: UploadDiagnosisComponent;
  let fixture: ComponentFixture<UploadDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
