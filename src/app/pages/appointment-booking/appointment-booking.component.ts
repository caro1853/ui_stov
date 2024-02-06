import { Component, OnInit } from '@angular/core';
import { IAppointment } from 'src/app/models/appointment.interface';
import { Hour } from 'src/app/models/operationalhours.interface';
import { AgendaService } from 'src/app/services/agenda.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SharedServices } from 'src/app/services/shared.services';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {
  //hours = [{fullHour: '00:00', hourToShow: '00:00 AM'}];

  hours = [{ name: '8:00 am', value: 8, available: true },
          { name: '9:00 am', value: 9, available: true },
          { name: '10:00 am', value: 10, available: true } ];

  /**
   *
   */
  dateSelected = '';
  constructor(private _sharedServices: SharedServices,
    private _agendaService: AgendaService,
    private _appointmentService: AppointmentService 
    ) {
      
    // TODO: Fix 1
    const dateString = (new Date()).getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    this.dateSelected = dateString;
    _agendaService.getHoursAvailable(1, dateString)
      .subscribe((data: any) => {
        this.hours = this.setHours(data, dateString);
    });

  }

  setHours(dayData: Hour[], dateString: string) {
    let _hours:any = [];

      dayData.forEach(element => {
        _hours.push({
          ...element,
          name : this._sharedServices.getHourFormat(element.schedule),
          date: dateString
        }
      );
    });
    return _hours;
  }

  ngOnInit() {
    const hourAvailable = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
    //this.hours = this.setHours(hourAvailable);
  }

  selectHour(hour: string){
    
  }
/*
  setHours(hourAvailable: string[]){
    const newHours:any = [];
    hourAvailable.forEach(item => {
      const h = item.split(':');
      if(h.length > 0){
        const hournumber = parseInt(h[0]);
        let hourToShow = '';
        if (hournumber < 12){
          hourToShow = hournumber + ':00 AM';
        } 
        else if (hournumber === 12){
            hourToShow = hournumber + ':00 M';
        } else if (hournumber > 12){
          hourToShow = (hournumber - 12) + ':00 PM';
        }
        newHours.push({
          fullHour: item,
          hourToShow: hourToShow
        });
      }
    });
    return newHours;
  }*/

  changeAvailable(hour: any){
    /*if(this.data){
      let dayData = this.data.find((d) => d.day === hour.day);
      let hourData = dayData?.hours?.find((h) => h.schedule === hour.schedule);
      hourData!.available = !hour!.available;
    }*/
  }

  changeDate(date: string){
    debugger;
    this.dateSelected = date;
    // TODO: Fix 1
    this._agendaService.getHoursAvailable(1, date)
      .subscribe((data: any) => {
        debugger;
        this.hours = this.setHours(data, date);
    });
  }

  saveAppointment(data:any){
    let appointment:IAppointment = {
      doctorId: 1,
      patientId: 1,
      scheduledDate: data.date,
      scheduleTime: data.schedule
    };
    debugger;
    this._appointmentService.saveAppointment(appointment)
      .subscribe((data) => {
      debugger;
    });
  }
}
