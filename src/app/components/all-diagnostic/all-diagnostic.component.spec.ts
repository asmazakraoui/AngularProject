import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDiagnosticComponent } from './all-diagnostic.component';

describe('AllDiagnosticComponent', () => {
  let component: AllDiagnosticComponent;
  let fixture: ComponentFixture<AllDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDiagnosticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
