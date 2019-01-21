import { TestBed } from '@angular/core/testing';

import { ReportParserService } from './report-parser.service';

describe('ReportParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportParserService = TestBed.get(ReportParserService);
    expect(service).toBeTruthy();
  });
});
