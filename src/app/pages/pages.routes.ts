import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AvailableCalendarComponent } from './available-calendar/available-calendar.component';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { OperationalHoursComponent } from './operational-hours/operational-hours.component';
import { BookingsComponent } from './bookings/bookings.component';
import { DoctorsAvailableComponent } from './doctors-available/doctors-available.component';
import { AuthGuard } from '../services/auth.guard';

const pagesRoutes: Routes = [
    {
      path: '', component: PagesComponent,
      children: [
        { path: 'bookings', component: BookingsComponent, data: { titulo: 'Calendario disponible' }, canActivate: [AuthGuard] },
        { path: 'operational-hours', component: OperationalHoursComponent, data: { titulo: 'Calendario disponible' }, canActivate: [AuthGuard] },
        { path: 'appointment-booking/:doctorselected', component: AppointmentBookingComponent, data: { titulo: 'Calendario disponible' }, canActivate: [AuthGuard] },
        { path: 'calendar-available', component: AvailableCalendarComponent, data: { titulo: 'Calendario disponible' } },
        { path: 'doctor-available', component: DoctorsAvailableComponent, data: { titulo: 'Calendario disponible' }, canActivate: [AuthGuard] },
        { path: '**', redirectTo: 'bookings', pathMatch: 'full' }      
      ]
    }
  ];
  
  export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);