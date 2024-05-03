import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { contactorGuardGuard } from './contactor-guard.guard';

describe('contactorGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => contactorGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
