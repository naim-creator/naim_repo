import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactorHomeComponent } from './contactor-home.component';

describe('ContactorHomeComponent', () => {
  let component: ContactorHomeComponent;
  let fixture: ComponentFixture<ContactorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactorHomeComponent]
    });
    fixture = TestBed.createComponent(ContactorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
