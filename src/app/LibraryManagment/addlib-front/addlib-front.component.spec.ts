import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlibFrontComponent } from './addlib-front.component';

describe('AddlibFrontComponent', () => {
  let component: AddlibFrontComponent;
  let fixture: ComponentFixture<AddlibFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlibFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlibFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
