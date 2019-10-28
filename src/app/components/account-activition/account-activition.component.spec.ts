import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountActivitionComponent } from './account-activition.component';

describe('AccountActivitionComponent', () => {
  let component: AccountActivitionComponent;
  let fixture: ComponentFixture<AccountActivitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountActivitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountActivitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
