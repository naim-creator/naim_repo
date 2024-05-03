import { TestBed } from '@angular/core/testing';

import { DevisRequestService } from './devis-request.service';

describe('DevisRequestService', () => {
  let service: DevisRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevisRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
