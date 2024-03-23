import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastUppComponent } from './podcast-upp.component';

describe('PodcastUppComponent', () => {
  let component: PodcastUppComponent;
  let fixture: ComponentFixture<PodcastUppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastUppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodcastUppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
