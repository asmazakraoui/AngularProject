import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastAffComponent } from './podcast-aff.component';

describe('PodcastAffComponent', () => {
  let component: PodcastAffComponent;
  let fixture: ComponentFixture<PodcastAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastAffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodcastAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
