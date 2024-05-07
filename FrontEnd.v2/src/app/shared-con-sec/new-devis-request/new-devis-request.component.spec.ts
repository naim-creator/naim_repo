import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDevisRequestComponent } from './new-devis-request.component';

describe('NewDevisRequestComponent', () => {
  let component: NewDevisRequestComponent;
  let fixture: ComponentFixture<NewDevisRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDevisRequestComponent]
    });
    fixture = TestBed.createComponent(NewDevisRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
