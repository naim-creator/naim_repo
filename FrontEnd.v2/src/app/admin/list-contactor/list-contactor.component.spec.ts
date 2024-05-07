import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactorComponent } from './list-contactor.component';

describe('ListContactorComponent', () => {
  let component: ListContactorComponent;
  let fixture: ComponentFixture<ListContactorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListContactorComponent]
    });
    fixture = TestBed.createComponent(ListContactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
