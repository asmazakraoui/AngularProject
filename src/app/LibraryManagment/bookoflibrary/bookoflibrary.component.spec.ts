import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookoflibraryComponent } from './bookoflibrary.component';

describe('BookoflibraryComponent', () => {
  let component: BookoflibraryComponent;
  let fixture: ComponentFixture<BookoflibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookoflibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookoflibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
