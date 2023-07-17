import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmTimePage } from './confirm-time.page';

describe('ConfirmTimePage', () => {
  let component: ConfirmTimePage;
  let fixture: ComponentFixture<ConfirmTimePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
