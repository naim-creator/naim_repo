import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactorNavbarComponent } from './contactor-navbar.component';

describe('ContactorNavbarComponent', () => {
  let component: ContactorNavbarComponent;
  let fixture: ComponentFixture<ContactorNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactorNavbarComponent]
    });
    fixture = TestBed.createComponent(ContactorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
