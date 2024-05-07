import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorisfrontUppComponent } from './favorisfront-upp.component';

describe('FavorisfrontUppComponent', () => {
  let component: FavorisfrontUppComponent;
  let fixture: ComponentFixture<FavorisfrontUppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorisfrontUppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavorisfrontUppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
