import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAffComponent } from './library-aff.component';

describe('LibraryAffComponent', () => {
  let component: LibraryAffComponent;
  let fixture: ComponentFixture<LibraryAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryAffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
