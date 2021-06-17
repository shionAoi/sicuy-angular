import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuyModalComponent } from './cuy-modal.component';

describe('CuyModalComponent', () => {
  let component: CuyModalComponent;
  let fixture: ComponentFixture<CuyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
