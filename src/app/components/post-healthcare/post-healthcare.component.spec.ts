import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHealthcareComponent } from './post-healthcare.component';

describe('PostHealthcareComponent', () => {
  let component: PostHealthcareComponent;
  let fixture: ComponentFixture<PostHealthcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostHealthcareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostHealthcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
