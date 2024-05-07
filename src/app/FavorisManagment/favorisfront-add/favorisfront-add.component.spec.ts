import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorisfrontAddComponent } from './favorisfront-add.component';

describe('FavorisfrontAddComponent', () => {
  let component: FavorisfrontAddComponent;
  let fixture: ComponentFixture<FavorisfrontAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorisfrontAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavorisfrontAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
