import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuyRemoveModalComponent } from './cuy-remove-modal.component';

describe('CuyRemoveModalComponent', () => {
  let component: CuyRemoveModalComponent;
  let fixture: ComponentFixture<CuyRemoveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuyRemoveModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuyRemoveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
