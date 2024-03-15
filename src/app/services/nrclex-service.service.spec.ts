import { TestBed } from '@angular/core/testing';

import {NrclexService } from './nrclex-service.service';

describe('NrclexService', () => {
  let service: NrclexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NrclexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
