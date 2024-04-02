import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMedicamentComponent } from './all-medicament.component';

describe('AllMedicamentComponent', () => {
  let component: AllMedicamentComponent;
  let fixture: ComponentFixture<AllMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMedicamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
