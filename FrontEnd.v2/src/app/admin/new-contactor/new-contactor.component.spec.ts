import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactorComponent } from './new-contactor.component';

describe('NewContactorComponent', () => {
  let component: NewContactorComponent;
  let fixture: ComponentFixture<NewContactorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewContactorComponent]
    });
    fixture = TestBed.createComponent(NewContactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
