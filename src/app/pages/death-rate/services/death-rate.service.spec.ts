import { TestBed } from '@angular/core/testing';

import { DeathRateService } from './death-rate.service';

describe('DeathRateService', () => {
  let service: DeathRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeathRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
