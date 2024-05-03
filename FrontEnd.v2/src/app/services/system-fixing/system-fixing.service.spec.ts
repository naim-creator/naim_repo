import { TestBed } from '@angular/core/testing';

import { SystemFixingService } from './system-fixing.service';

describe('SystemFixingService', () => {
  let service: SystemFixingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemFixingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
