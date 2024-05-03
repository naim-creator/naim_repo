import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSolarPanelComponent } from './new-solar-panel.component';

describe('NewSolarPanelComponent', () => {
  let component: NewSolarPanelComponent;
  let fixture: ComponentFixture<NewSolarPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSolarPanelComponent]
    });
    fixture = TestBed.createComponent(NewSolarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
