import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceExpiredComponent } from './licence-expired.component';

describe('LicenceExpiredComponent', () => {
  let component: LicenceExpiredComponent;
  let fixture: ComponentFixture<LicenceExpiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenceExpiredComponent]
    });
    fixture = TestBed.createComponent(LicenceExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
