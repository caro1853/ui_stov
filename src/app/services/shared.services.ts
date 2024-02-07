import { Injectable } from "@angular/core";
import { IDcotor } from "../models/doctor.interface";

@Injectable({
    providedIn: 'root'
  })
export class SharedServices {

  doctorSelected: IDcotor = {
    id: 0,
    name: "",
    email: "",
    especiality: "",
    description: ""
  };

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



    getDateFormattedToString(date: Date) {
        const m:string = ("00" + (date.getMonth()+ 1).toString()).slice(-2);
        const d:string = ("00" + date.getDate().toString()).slice(-2);
        return `${date.getFullYear()}-${m}-${d}`;
    }

    getTokenSaved() {
        if (localStorage.getItem('token')) {
          return localStorage.getItem('token');
        } else {
          return '';
        }
      }

    getDoctorSelected(){
        return this.doctorSelected;
    }

    setDoctorSelected(doctor: IDcotor){
      this.doctorSelected = doctor;
    }
}
