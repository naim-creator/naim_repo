import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkerComponent } from './list-worker.component';

describe('ListWorkerComponent', () => {
  let component: ListWorkerComponent;
  let fixture: ComponentFixture<ListWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListWorkerComponent]
    });
    fixture = TestBed.createComponent(ListWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
