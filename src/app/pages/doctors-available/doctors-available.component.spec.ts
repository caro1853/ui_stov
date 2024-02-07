import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsAvailableComponent } from './doctors-available.component';

describe('DoctorsAvailableComponent', () => {
  let component: DoctorsAvailableComponent;
  let fixture: ComponentFixture<DoctorsAvailableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsAvailableComponent]
    });
    fixture = TestBed.createComponent(DoctorsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
