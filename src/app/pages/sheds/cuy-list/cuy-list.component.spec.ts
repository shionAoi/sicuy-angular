import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuyListComponent } from './cuy-list.component';

describe('CuyListComponent', () => {
  let component: CuyListComponent;
  let fixture: ComponentFixture<CuyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
