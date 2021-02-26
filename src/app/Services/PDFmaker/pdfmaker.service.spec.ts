import { TestBed } from '@angular/core/testing';

import { PDFmakerService } from './pdfmaker.service';

describe('PDFmakerService', () => {
  let service: PDFmakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PDFmakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
