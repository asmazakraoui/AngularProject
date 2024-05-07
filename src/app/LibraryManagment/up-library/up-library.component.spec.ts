import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpLibraryComponent } from './up-library.component';

describe('UpLibraryComponent', () => {
  let component: UpLibraryComponent;
  let fixture: ComponentFixture<UpLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
