import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectbookTofavppComponent } from './affectbook-tofavpp.component';

describe('AffectbookTofavppComponent', () => {
  let component: AffectbookTofavppComponent;
  let fixture: ComponentFixture<AffectbookTofavppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectbookTofavppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectbookTofavppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
