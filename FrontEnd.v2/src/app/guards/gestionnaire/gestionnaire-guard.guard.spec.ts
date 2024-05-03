import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gestionnaireGuardGuard } from './gestionnaire-guard.guard';

describe('gestionnaireGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gestionnaireGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
