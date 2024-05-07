import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBatteryComponent } from './new-battery.component';

describe('NewBatteryComponent', () => {
  let component: NewBatteryComponent;
  let fixture: ComponentFixture<NewBatteryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBatteryComponent]
    });
    fixture = TestBed.createComponent(NewBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
