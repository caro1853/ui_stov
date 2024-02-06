import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AvailableCalendarComponent } from './available-calendar/available-calendar.component';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { OperationalHoursComponent } from './operational-hours/operational-hours.component';
import { BookingsComponent } from './bookings/bookings.component';

const pagesRoutes: Routes = [
    {
      path: '', component: PagesComponent,
      children: [
        { path: 'bookings', component: BookingsComponent, data: { titulo: 'Calendario disponible' } },
        { path: 'operational-hours', component: OperationalHoursComponent, data: { titulo: 'Calendario disponible' } },
        { path: 'appointment-booking', component: AppointmentBookingComponent, data: { titulo: 'Calendario disponible' } },
        { path: 'calendar-available', component: AvailableCalendarComponent, data: { titulo: 'Calendario disponible' } },
        { path: '**', redirectTo: 'bookings', pathMatch: 'full' }      
      ]
    }
  ];
  
  export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);