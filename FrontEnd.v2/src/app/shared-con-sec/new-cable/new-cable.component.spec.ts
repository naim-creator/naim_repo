import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCableComponent } from './new-cable.component';

describe('NewCableComponent', () => {
  let component: NewCableComponent;
  let fixture: ComponentFixture<NewCableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCableComponent]
    });
    fixture = TestBed.createComponent(NewCableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
