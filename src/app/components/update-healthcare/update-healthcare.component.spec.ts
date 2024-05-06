import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHealthcareComponent } from './update-healthcare.component';

describe('UpdateHealthcareComponent', () => {
  let component: UpdateHealthcareComponent;
  let fixture: ComponentFixture<UpdateHealthcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHealthcareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHealthcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
