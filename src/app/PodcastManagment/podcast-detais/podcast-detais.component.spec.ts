import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastDetaisComponent } from './podcast-detais.component';

describe('PodcastDetaisComponent', () => {
  let component: PodcastDetaisComponent;
  let fixture: ComponentFixture<PodcastDetaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastDetaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodcastDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
