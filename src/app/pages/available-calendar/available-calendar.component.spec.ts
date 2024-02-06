import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCalendarComponent } from './available-calendar.component';

describe('AvailableCalendarComponent', () => {
  let component: AvailableCalendarComponent;
  let fixture: ComponentFixture<AvailableCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableCalendarComponent]
    });
    fixture = TestBed.createComponent(AvailableCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
