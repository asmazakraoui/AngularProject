import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplibrayFrontComponent } from './uplibray-front.component';

describe('UplibrayFrontComponent', () => {
  let component: UplibrayFrontComponent;
  let fixture: ComponentFixture<UplibrayFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UplibrayFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UplibrayFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
