import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationControlsComponent } from './pagination-controls.component';

describe('PaginationComponent', () => {
  let component: PaginationControlsComponent;
  let fixture: ComponentFixture<PaginationControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
