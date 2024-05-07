import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDevisComponent } from './new-devis.component';

describe('NewDevisComponent', () => {
  let component: NewDevisComponent;
  let fixture: ComponentFixture<NewDevisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDevisComponent]
    });
    fixture = TestBed.createComponent(NewDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
