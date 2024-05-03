import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkerComponent } from './new-worker.component';

describe('NewWorkerComponent', () => {
  let component: NewWorkerComponent;
  let fixture: ComponentFixture<NewWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewWorkerComponent]
    });
    fixture = TestBed.createComponent(NewWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
