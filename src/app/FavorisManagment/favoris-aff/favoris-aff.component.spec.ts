import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorisAffComponent } from './favoris-aff.component';

describe('FavorisAffComponent', () => {
  let component: FavorisAffComponent;
  let fixture: ComponentFixture<FavorisAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorisAffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavorisAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
