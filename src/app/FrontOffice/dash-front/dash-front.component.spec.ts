import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFrontComponent } from './dash-front.component';

describe('DashFrontComponent', () => {
  let component: DashFrontComponent;
  let fixture: ComponentFixture<DashFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
