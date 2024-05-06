import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHealthcareComponent } from './all-healthcare.component';

describe('AllHealthcareComponent', () => {
  let component: AllHealthcareComponent;
  let fixture: ComponentFixture<AllHealthcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHealthcareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllHealthcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
