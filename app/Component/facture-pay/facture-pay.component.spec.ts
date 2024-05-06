import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturePayComponent } from './facture-pay.component';

describe('FacturePayComponent', () => {
  let component: FacturePayComponent;
  let fixture: ComponentFixture<FacturePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturePayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
