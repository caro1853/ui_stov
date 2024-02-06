import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class SharedServices {
    getHourFormat(hour: number) {
        if (hour === 0) return '12:00 am';
        return hour > 12 ? (hour - 12) + ':00 pm' : hour + ':00 am';
    }
    getDayFormat(day: number) {
        switch (day) {
            case 0: return 'Domingo';
            case 1: return 'Lunes';
            case 2: return 'Martes';
            case 3: return 'Miercoles';
            case 4: return 'Jueves';
            case 5: return 'Viernes';
            case 6: return 'Sabado';
        }
        return '';
    }
}
