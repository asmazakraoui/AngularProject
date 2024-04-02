import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMedicamentComponent } from './post-medicament.component';

describe('PostMedicamentComponent', () => {
  let component: PostMedicamentComponent;
  let fixture: ComponentFixture<PostMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMedicamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
