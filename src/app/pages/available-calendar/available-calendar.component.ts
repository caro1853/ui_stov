import { Component } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-available-calendar',
  templateUrl: './available-calendar.component.html',
  styleUrls: ['./available-calendar.component.css']
})
export class AvailableCalendarComponent {
  /**
   *
   */
  constructor(private _calendarService: CalendarService) {
     console.log(_calendarService.getCalendarAvailable(1, new Date()));
  }
}
