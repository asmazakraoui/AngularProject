import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAfterlogComponent } from './dash-afterlog.component';

describe('DashAfterlogComponent', () => {
  let component: DashAfterlogComponent;
  let fixture: ComponentFixture<DashAfterlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAfterlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashAfterlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
