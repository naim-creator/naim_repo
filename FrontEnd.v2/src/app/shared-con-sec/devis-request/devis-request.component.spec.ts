import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisRequestComponent } from './devis-request.component';

describe('DevisRequestComponent', () => {
  let component: DevisRequestComponent;
  let fixture: ComponentFixture<DevisRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevisRequestComponent]
    });
    fixture = TestBed.createComponent(DevisRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
