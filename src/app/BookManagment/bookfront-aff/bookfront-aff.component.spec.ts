import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookfrontAffComponent } from './bookfront-aff.component';

describe('BookfrontAffComponent', () => {
  let component: BookfrontAffComponent;
  let fixture: ComponentFixture<BookfrontAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookfrontAffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookfrontAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
