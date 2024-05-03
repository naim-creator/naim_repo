import { TestBed } from '@angular/core/testing';

import { ContactorService } from './contactor.service';

describe('ContactorService', () => {
  let service: ContactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
