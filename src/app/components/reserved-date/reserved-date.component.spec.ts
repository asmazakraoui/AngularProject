import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedDateComponent } from './reserved-date.component';

describe('ReservedDateComponent', () => {
  let component: ReservedDateComponent;
  let fixture: ComponentFixture<ReservedDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
