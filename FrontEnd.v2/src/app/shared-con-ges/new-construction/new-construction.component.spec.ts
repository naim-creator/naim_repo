import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConstructionComponent } from './new-construction.component';

describe('NewConstructionComponent', () => {
  let component: NewConstructionComponent;
  let fixture: ComponentFixture<NewConstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewConstructionComponent]
    });
    fixture = TestBed.createComponent(NewConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
