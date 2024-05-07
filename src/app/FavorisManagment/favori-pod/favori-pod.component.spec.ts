import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriPodComponent } from './favori-pod.component';

describe('FavoriPodComponent', () => {
  let component: FavoriPodComponent;
  let fixture: ComponentFixture<FavoriPodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriPodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriPodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
