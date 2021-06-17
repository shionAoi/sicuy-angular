import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedStatusModalComponent } from './shed-status-modal.component';

describe('ModalConfirmComponent', () => {
  let component: ShedStatusModalComponent;
  let fixture: ComponentFixture<ShedStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedStatusModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
