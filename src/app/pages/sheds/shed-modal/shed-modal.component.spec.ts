import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedModalComponent } from './shed-modal.component';

describe('ShedModalComponent', () => {
  let component: ShedModalComponent;
  let fixture: ComponentFixture<ShedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
