import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSeeComponent } from './profile-see.component';

describe('ProfileSeeComponent', () => {
  let component: ProfileSeeComponent;
  let fixture: ComponentFixture<ProfileSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
