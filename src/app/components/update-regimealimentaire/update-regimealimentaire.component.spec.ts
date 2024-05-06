import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRegimealimentaireComponent } from './update-regimealimentaire.component';

describe('UpdateRegimealimentaireComponent', () => {
  let component: UpdateRegimealimentaireComponent;
  let fixture: ComponentFixture<UpdateRegimealimentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRegimealimentaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRegimealimentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
