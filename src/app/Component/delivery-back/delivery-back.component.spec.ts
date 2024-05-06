import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBackComponent } from './delivery-back.component';

describe('DeliveryBackComponent', () => {
  let component: DeliveryBackComponent;
  let fixture: ComponentFixture<DeliveryBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
