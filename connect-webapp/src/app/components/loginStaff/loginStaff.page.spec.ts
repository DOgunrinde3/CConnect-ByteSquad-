import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStaffPage } from './loginStaff.page';

describe('LoginPage', () => {
  let component: LoginStaffPage;
  let fixture: ComponentFixture<LoginStaffPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginStaffPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
