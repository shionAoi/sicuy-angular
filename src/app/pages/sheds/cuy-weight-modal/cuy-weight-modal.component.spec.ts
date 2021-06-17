import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuyWeightModalComponent } from './cuy-weight-modal.component';

describe('CuyWeightModalComponent', () => {
  let component: CuyWeightModalComponent;
  let fixture: ComponentFixture<CuyWeightModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuyWeightModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuyWeightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
