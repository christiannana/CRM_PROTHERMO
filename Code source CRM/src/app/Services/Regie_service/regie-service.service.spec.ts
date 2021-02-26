import { TestBed } from '@angular/core/testing';

import { RegieServiceService } from './regie-service.service';

describe('RegieServiceService', () => {
  let service: RegieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
