import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBackComponent } from './setting-back.component';

describe('SettingBackComponent', () => {
  let component: SettingBackComponent;
  let fixture: ComponentFixture<SettingBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
