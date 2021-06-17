import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedsGridItemComponent } from './sheds-grid-item.component';

describe('ShedsGridItemComponent', () => {
  let component: ShedsGridItemComponent;
  let fixture: ComponentFixture<ShedsGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedsGridItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedsGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
