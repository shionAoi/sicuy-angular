import { TestBed } from '@angular/core/testing';

import { ShedsService } from './sheds.service';

describe('ShedsService', () => {
  let service: ShedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
