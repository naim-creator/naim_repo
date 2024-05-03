import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSystemFixingComponent } from './new-system-fixing.component';

describe('NewSystemFixingComponent', () => {
  let component: NewSystemFixingComponent;
  let fixture: ComponentFixture<NewSystemFixingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSystemFixingComponent]
    });
    fixture = TestBed.createComponent(NewSystemFixingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
