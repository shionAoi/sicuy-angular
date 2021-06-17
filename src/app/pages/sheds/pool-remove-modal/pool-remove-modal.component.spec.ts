import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolRemoveModalComponent } from './pool-remove-modal.component';

describe('PoolRemoveModalComponent', () => {
  let component: PoolRemoveModalComponent;
  let fixture: ComponentFixture<PoolRemoveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolRemoveModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolRemoveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
