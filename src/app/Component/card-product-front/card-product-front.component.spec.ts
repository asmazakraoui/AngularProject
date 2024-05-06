import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductFrontComponent } from './card-product-front.component';

describe('CardProductFrontComponent', () => {
  let component: CardProductFrontComponent;
  let fixture: ComponentFixture<CardProductFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardProductFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProductFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
