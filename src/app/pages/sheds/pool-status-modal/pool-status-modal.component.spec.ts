import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolStatusModalComponent } from './pool-status-modal.component';

describe('PoolStatusModalComponent', () => {
  let component: PoolStatusModalComponent;
  let fixture: ComponentFixture<PoolStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolStatusModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
