import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuyStatusModalComponent } from './cuy-status-modal.component';

describe('CuyStatusModalComponent', () => {
  let component: CuyStatusModalComponent;
  let fixture: ComponentFixture<CuyStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuyStatusModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuyStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
