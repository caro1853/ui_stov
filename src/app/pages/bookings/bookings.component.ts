import { Component, OnInit } from '@angular/core';
import { IAgenda } from 'src/app/models/agenda.interface';
import { AppointmentService } from 'src/app/services/appointment.service';
import { LoginService } from 'src/app/services/login.service';
import { SharedServices } from 'src/app/services/shared.services';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {

  agenda: any[] = [];
  currentdate:string='';
  showalert:boolean=false;
  messagealert:string="";
  doctorId: number = 0;

  constructor(private _appointmentService: AppointmentService, 
    private _sharedServices: SharedServices,
    private _loginService: LoginService ) {
    this.doctorId = _loginService.getDoctorId();
      this.currentdate = _sharedServices.getDateFormattedToString(new Date());
      this.loadData(new Date(this.currentdate));
    }

    loadData(date: Date){
      this._appointmentService.getAppointmentByDoctorAndDate(this.doctorId, date)
      .subscribe((data: any) => {
        this.hideAlert();
        this.agenda = data;
        if(data.length === 0){
          this.showAlert('No hay citas para el día seleccionado', 'warning');
        }
        else{
          this.agenda.forEach(element => {
            element.from = this._sharedServices.getHourFormat(element.scheduleTime);
            element.to = this._sharedServices.getHourFormat(element.scheduleTime + 1);
          });
        }
      });
    }

    changeDate(event: any){
      this.loadData(new Date( event.target.value ));
    }
    showAlert(message:string, type:string){
      this.showalert = true;
      this.messagealert = message;
    }

    hideAlert(){
      this.showalert = false;
    }
}
