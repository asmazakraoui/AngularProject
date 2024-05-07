import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorisfrontAffComponent } from './favorisfront-aff.component';

describe('FavorisfrontAffComponent', () => {
  let component: FavorisfrontAffComponent;
  let fixture: ComponentFixture<FavorisfrontAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorisfrontAffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavorisfrontAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
