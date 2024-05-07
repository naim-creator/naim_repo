import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInverterComponent } from './new-inverter.component';

describe('NewInverterComponent', () => {
  let component: NewInverterComponent;
  let fixture: ComponentFixture<NewInverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInverterComponent]
    });
    fixture = TestBed.createComponent(NewInverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
