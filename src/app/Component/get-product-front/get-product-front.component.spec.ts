import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductFrontComponent } from './get-product-front.component';

describe('GetProductFrontComponent', () => {
  let component: GetProductFrontComponent;
  let fixture: ComponentFixture<GetProductFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetProductFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetProductFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
