import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAlertComponent } from './info-alert.component';

describe('InfoAlertComponent', () => {
  let component: InfoAlertComponent;
  let fixture: ComponentFixture<InfoAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoAlertComponent]
    });
    fixture = TestBed.createComponent(InfoAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
