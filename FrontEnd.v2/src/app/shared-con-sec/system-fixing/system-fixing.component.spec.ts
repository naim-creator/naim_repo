import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemFixingComponent } from './system-fixing.component';

describe('SystemFixingComponent', () => {
  let component: SystemFixingComponent;
  let fixture: ComponentFixture<SystemFixingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemFixingComponent]
    });
    fixture = TestBed.createComponent(SystemFixingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
