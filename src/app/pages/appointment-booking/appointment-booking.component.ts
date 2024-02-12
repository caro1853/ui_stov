import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { IAppointment } from 'src/app/models/appointment.interface';
import { IDcotor } from 'src/app/models/doctor.interface';
import { Hour } from 'src/app/models/operationalhours.interface';
import { AppointmentService } from 'src/app/services/appointment.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { LoginService } from 'src/app/services/login.service';
import { SharedServices } from 'src/app/services/shared.services';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent {

  hours = [{ name: '8:00 am', value: 8, available: true, schedule: 0 },
          { name: '9:00 am', value: 9, available: true, schedule: 0 },
          { name: '10:00 am', value: 10, available: true, schedule: 0 } ];

  scheduleselected:number=0;
  showalert:boolean=false;
  messagealert:string="";
  doctorIdSelected:number = 0;
  doctorSelected:IDcotor={
    id: 0,
    name: "",
    email: "",
    especiality: "",
    description: ""
  };   
  /**
   *
   */
  dateSelected = '';
  constructor(private _activatedRoute: ActivatedRoute,
    private _sharedServices: SharedServices,
    private _appointmentService: AppointmentService,
    private _loginService: LoginService,
    private _calendarService: CalendarService)
     {
      
      this.doctorSelected = this._sharedServices.getDoctorSelected();
    
    this.dateSelected = this._sharedServices.getDateFormattedToString(new Date());
    this.loadData();  
    
  }

  loadData(){
    this.getDoctorSelected().pipe(
      switchMap((params: any) => {
        if(params['doctorselected']){
          if(Number.isInteger(Number(params['doctorselected']))){
            this.doctorIdSelected = Number(params['doctorselected']);
            return this._calendarService.getHoursAvailable(this.doctorIdSelected, new Date());
          }
        }
        return of(null);
      }
    )).subscribe({next: (data: any) => {
      if(data){
        this.hours = this.setHours(data, new Date());
      }
    },
    error: (err: any) => {
      this.showAlert(err?.error?.message??'Error al cargar las horas disponibles');
    }
  });
  }

  getDoctorSelected(): Observable<any>{
    return this._activatedRoute.params;
  }

  setHours(dayData: Hour[], date: Date) {
    this.hideAlert();
    if (dayData.length == 0){
      this.showAlert("No hay horas disponibles");
    }
    let _hours:any = [];

      dayData.forEach(element => {
        _hours.push({
          ...element,
          name : this._sharedServices.getHourFormat(element.schedule),
          date: date
        }
      );
    });
    return _hours;
  }


  changeDate(date: Date){
    this.dateSelected = this._sharedServices.getDateFormattedToString(date);
    this._calendarService.getHoursAvailable(this.doctorIdSelected, date)
      .subscribe((data: any) => {
       
        this.hours = this.setHours(data, date);
    });
  }

  saveAppointment(data:any){
    
    let appointment:IAppointment = {
      doctorId: this.doctorIdSelected,
      patientId: this._loginService.getPatientId(),
      scheduledDate: data.date,
      scheduleTime: data.schedule
    };
    this.scheduleselected = data.schedule;
    this.hideAlert();
    
    this._appointmentService.saveAppointment(appointment)
      .subscribe({
        next: (data) => {
        
        this.removeScheduleSaved(this.scheduleselected);
        this.showAlert("Su cita ha sido asignada");
      },
      error: (err) => {
        
        this.showAlert(err?.error?.message??'Error al guardar la cita');
      }
    });
  }

  removeScheduleSaved(schedule: number){
    const findSchedule = this.hours.findIndex(p=> p.schedule == schedule);
    this.hours.splice(findSchedule, 1);
  }

  showAlert(message:string){
    this.showalert = true;
    this.messagealert = message;
  }

  hideAlert(){
    this.showalert = false;
  }
}
