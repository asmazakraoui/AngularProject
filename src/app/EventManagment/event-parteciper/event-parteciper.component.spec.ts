import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParteciperComponent } from './event-parteciper.component';

describe('EventParteciperComponent', () => {
  let component: EventParteciperComponent;
  let fixture: ComponentFixture<EventParteciperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventParteciperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventParteciperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
