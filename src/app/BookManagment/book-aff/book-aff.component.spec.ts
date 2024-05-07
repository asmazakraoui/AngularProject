import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAffComponent } from './book-aff.component';

describe('BookAffComponent', () => {
  let component: BookAffComponent;
  let fixture: ComponentFixture<BookAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookAffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
