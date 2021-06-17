import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedsComponent } from './sheds.component';

describe('ShedsComponent', () => {
  let component: ShedsComponent;
  let fixture: ComponentFixture<ShedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
