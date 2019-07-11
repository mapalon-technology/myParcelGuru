import { TestBed } from '@angular/core/testing';

import { CommanserviceService } from './commanservice.service';

describe('CommanserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommanserviceService = TestBed.get(CommanserviceService);
    expect(service).toBeTruthy();
  });
});
