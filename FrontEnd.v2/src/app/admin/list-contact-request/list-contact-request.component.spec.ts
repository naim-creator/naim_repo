import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactRequestComponent } from './list-contact-request.component';

describe('ListContactRequestComponent', () => {
  let component: ListContactRequestComponent;
  let fixture: ComponentFixture<ListContactRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListContactRequestComponent]
    });
    fixture = TestBed.createComponent(ListContactRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
