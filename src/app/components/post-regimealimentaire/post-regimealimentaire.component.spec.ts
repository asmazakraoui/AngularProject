import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRegimealimentaireComponent } from './post-regimealimentaire.component';

describe('PostRegimealimentaireComponent', () => {
  let component: PostRegimealimentaireComponent;
  let fixture: ComponentFixture<PostRegimealimentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostRegimealimentaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostRegimealimentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
