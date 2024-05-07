import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorisUppComponent } from './favoris-upp.component';

describe('FavorisUppComponent', () => {
  let component: FavorisUppComponent;
  let fixture: ComponentFixture<FavorisUppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorisUppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavorisUppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
