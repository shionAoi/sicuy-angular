import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedsGridComponent } from './sheds-grid.component';

describe('ShedsGridComponent', () => {
  let component: ShedsGridComponent;
  let fixture: ComponentFixture<ShedsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
