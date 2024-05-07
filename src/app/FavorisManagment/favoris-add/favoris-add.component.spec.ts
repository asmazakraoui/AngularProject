import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorisAddComponent } from './favoris-add.component';

describe('FavorisAddComponent', () => {
  let component: FavorisAddComponent;
  let fixture: ComponentFixture<FavorisAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorisAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavorisAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
