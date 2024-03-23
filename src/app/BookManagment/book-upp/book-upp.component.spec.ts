import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUppComponent } from './book-upp.component';

describe('BookUppComponent', () => {
  let component: BookUppComponent;
  let fixture: ComponentFixture<BookUppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookUppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookUppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
