import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCategoryValueComponent } from './card-category-value.component';

describe('CardCategoryValueComponent', () => {
  let component: CardCategoryValueComponent;
  let fixture: ComponentFixture<CardCategoryValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCategoryValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCategoryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
