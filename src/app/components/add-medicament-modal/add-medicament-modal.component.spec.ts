import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicamentModalComponent } from './add-medicament-modal.component';

describe('AddMedicamentModalComponent', () => {
  let component: AddMedicamentModalComponent;
  let fixture: ComponentFixture<AddMedicamentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMedicamentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMedicamentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
