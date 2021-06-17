import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilizeCuyComponent } from './mobilize-cuy.component';

describe('MobilizeCuyComponent', () => {
  let component: MobilizeCuyComponent;
  let fixture: ComponentFixture<MobilizeCuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilizeCuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilizeCuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
