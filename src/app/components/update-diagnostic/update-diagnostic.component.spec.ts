import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiagnosticComponent } from './update-diagnostic.component';

describe('UpdateDiagnosticComponent', () => {
  let component: UpdateDiagnosticComponent;
  let fixture: ComponentFixture<UpdateDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDiagnosticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
