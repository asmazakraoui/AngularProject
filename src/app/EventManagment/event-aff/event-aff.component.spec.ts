import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAffComponent } from './event-aff.component';

describe('EventAffComponent', () => {
  let component: EventAffComponent;
  let fixture: ComponentFixture<EventAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
