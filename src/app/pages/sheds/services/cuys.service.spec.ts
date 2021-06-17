import { TestBed } from '@angular/core/testing';

import { CuysService } from './cuys.service';

describe('CuysService', () => {
  let service: CuysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
