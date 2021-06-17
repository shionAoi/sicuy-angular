import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuySacaModalComponent } from './cuy-saca-modal.component';

describe('CuySacaModalComponent', () => {
  let component: CuySacaModalComponent;
  let fixture: ComponentFixture<CuySacaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuySacaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuySacaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
