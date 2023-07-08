import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageApptStaffPage } from './manage-appt-staff.page';

describe('ManageApptStaffPage', () => {
  let component: ManageApptStaffPage;
  let fixture: ComponentFixture<ManageApptStaffPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageApptStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
