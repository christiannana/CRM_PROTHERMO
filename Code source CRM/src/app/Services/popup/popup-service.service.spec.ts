import { TestBed } from '@angular/core/testing';

import { POPUPServiceService } from './popup-service.service';

describe('POPUPServiceService', () => {
  let service: POPUPServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(POPUPServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
