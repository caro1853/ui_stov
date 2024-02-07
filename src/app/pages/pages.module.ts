import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AvailableCalendarComponent } from './available-calendar/available-calendar.component';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { CalendarComponent } from '../shared/calendar/calendar.component';
import { OperationalHoursComponent } from './operational-hours/operational-hours.component';
import { BookingsComponent } from './bookings/bookings.component';
import { NavMenuComponent } from '../shared/nav-menu/nav-menu.component';
import { InfoAlertComponent } from '../shared/info-alert/info-alert.component';
import { DoctorsAvailableComponent } from './doctors-available/doctors-available.component';

@NgModule({
    declarations: [
      PagesComponent,
      AvailableCalendarComponent,
      AppointmentBookingComponent,
      CalendarComponent,
      OperationalHoursComponent,
      BookingsComponent,
      NavMenuComponent,
      InfoAlertComponent,
      DoctorsAvailableComponent
    ],
    imports: [ 
      PAGES_ROUTES,
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      RouterModule
      
    ],
    providers: [],
    bootstrap: []
  })
  export class PagesModule { }