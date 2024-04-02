import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDiagnosticComponent } from './post-diagnostic.component';

describe('PostDiagnosticComponent', () => {
  let component: PostDiagnosticComponent;
  let fixture: ComponentFixture<PostDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDiagnosticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
