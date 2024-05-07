import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactorLandingPageComponent } from './contactor-landing-page.component';

describe('ContactorLandingPageComponent', () => {
  let component: ContactorLandingPageComponent;
  let fixture: ComponentFixture<ContactorLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactorLandingPageComponent]
    });
    fixture = TestBed.createComponent(ContactorLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
