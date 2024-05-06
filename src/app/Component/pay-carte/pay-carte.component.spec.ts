import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCarteComponent } from './pay-carte.component';

describe('PayCarteComponent', () => {
  let component: PayCarteComponent;
  let fixture: ComponentFixture<PayCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayCarteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
