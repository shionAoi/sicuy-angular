import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedRemoveModalComponent } from './shed-remove-modal.component';

describe('ShedRemoveModalComponent', () => {
  let component: ShedRemoveModalComponent;
  let fixture: ComponentFixture<ShedRemoveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedRemoveModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedRemoveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
