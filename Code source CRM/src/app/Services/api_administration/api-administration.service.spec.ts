import { TestBed } from '@angular/core/testing';

import { ApiAdministrationService } from './api-administration.service';

describe('ApiAdministrationService', () => {
  let service: ApiAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
