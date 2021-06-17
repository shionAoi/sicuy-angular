import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthRateComponent } from './birth-rate.component';

describe('BirthRateComponent', () => {
  let component: BirthRateComponent;
  let fixture: ComponentFixture<BirthRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
