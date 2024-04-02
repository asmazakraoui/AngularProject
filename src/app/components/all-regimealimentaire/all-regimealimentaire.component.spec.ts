import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRegimealimentaireComponent } from './all-regimealimentaire.component';

describe('AllRegimealimentaireComponent', () => {
  let component: AllRegimealimentaireComponent;
  let fixture: ComponentFixture<AllRegimealimentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRegimealimentaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRegimealimentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
