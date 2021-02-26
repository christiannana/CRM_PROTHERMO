import { TestBed } from '@angular/core/testing';

import { AUTHServiceService } from './auth-service.service';

describe('AUTHServiceService', () => {
  let service: AUTHServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AUTHServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
