import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuyDeathModalComponent } from './cuy-death-modal.component';

describe('CuyDeathModalComponent', () => {
  let component: CuyDeathModalComponent;
  let fixture: ComponentFixture<CuyDeathModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuyDeathModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuyDeathModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
