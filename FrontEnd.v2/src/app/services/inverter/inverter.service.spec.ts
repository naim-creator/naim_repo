import { TestBed } from '@angular/core/testing';

import { InverterService } from './inverter.service';

describe('InverterService', () => {
  let service: InverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
