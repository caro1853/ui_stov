import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class CalendarService {
    constructor() { }
    getCalendarAvailable(provider: number, date: Date) {

        return {
            provider: 1,
            start : 8,
            end : 15,
            availables: [
                { hour: 8, available: true },
                { hour: 9, available: true },
                { hour: 10, available: true }
            ]
        }
    }
}