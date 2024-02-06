import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalHoursComponent } from './operational-hours.component';

describe('OperationalHoursComponent', () => {
  let component: OperationalHoursComponent;
  let fixture: ComponentFixture<OperationalHoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationalHoursComponent]
    });
    fixture = TestBed.createComponent(OperationalHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
