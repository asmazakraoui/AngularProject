import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastfrontAffComponent } from './podcastfront-aff.component';

describe('PodcastfrontAffComponent', () => {
  let component: PodcastfrontAffComponent;
  let fixture: ComponentFixture<PodcastfrontAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastfrontAffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodcastfrontAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
