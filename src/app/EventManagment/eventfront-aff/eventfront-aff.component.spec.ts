import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventfrontAffComponent } from './eventfront-aff.component';

describe('EventfrontAffComponent', () => {
  let component: EventfrontAffComponent;
  let fixture: ComponentFixture<EventfrontAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventfrontAffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventfrontAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
