import { TestBed } from '@angular/core/testing';

import { MobilizeCuyService } from './mobilize-cuy.service';

describe('MobilizeCuyService', () => {
  let service: MobilizeCuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobilizeCuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
