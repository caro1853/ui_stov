import { Component, OnInit } from '@angular/core';
import { Hour, IOperationalHours } from 'src/app/models/operationalhours.interface';
import { IOperationalHoursDoctor } from 'src/app/models/operationalhoursdoctor.interface';
import { ConfigureCalendarService } from 'src/app/services/configurecalendar.service';
import { LoginService } from 'src/app/services/login.service';
import { SharedServices } from 'src/app/services/shared.services';

@Component({
  selector: 'app-operational-hours',
  templateUrl: './operational-hours.component.html',
  styleUrls: ['./operational-hours.component.css']
})
export class OperationalHoursComponent implements OnInit {
  days = [{ name: 'Lunes', day: 1 , active: '', available: true}];

  hours = [{ name: '8:00 am', value: 8, available: true },
          { name: '9:00 am', value: 9, available: true },
          { name: '10:00 am', value: 10, available: true } ];

  data!:IOperationalHours[];
  
  showalert:boolean=false;
  messagealert:string="";
  doctorId: number = 0;
  /**
   *
   */
  constructor(private _sharedServices: SharedServices, 
    private _configureCalendarService: ConfigureCalendarService,
    private _loginService: LoginService) {
      
      this.doctorId = _loginService.getDoctorId();
    let c = this._configureCalendarService.
      
        

        getOperationalHours(this.doctorId).subscribe((data: any) => {
          this.data = data;
          this.days = this.loadDays();
          if(this.days?.length > 0){
            this.chooseDay(this.days[0]);
          }
        });
  }

  ngOnInit(): void {

  }

  loadDays(){
    let _days:any = [];
    if(this.data){
      this.data?.forEach(element => {
        _days.push({
          ...element,
          name : this._sharedServices.getDayFormat(element.day),
          });
      });
    }
    return _days;
  }

  chooseDay(item:any){
    this.days.forEach(i => {
      if (i.day === item.day) {
        i.active = 'active';
      } else
        i.active = '';
    });
    this.loadDay(item.day);
  }

  setHours(dayData: Hour[], day: number) {
    let _hours:any = [];
    dayData.forEach(element => {
      _hours.push({
        ...element,
        day,
        name : this._sharedServices.getHourFormat(element.schedule),
      }
    );
  });
  return _hours;
}

  loadDay(day: number){
    if(this.data){
      console.log(day);
      let dayData = this.data.find((d) => d.day === day);
      this.hours = this.setHours(dayData?.hours || [], day);
    }
  }

  changeAvailable(hour: any){
    if(this.data){
      let dayData = this.data.find((d) => d.day === hour.day);
      let hourData = dayData?.hours?.find((h) => h.schedule === hour.schedule);
      hourData!.available = !hour!.available;
    }
  }

  save(){
    let dataToSave: IOperationalHoursDoctor = {
      doctorId: this.doctorId,
      OperationalHours: this.data
    };
    
    this.hideAlert();
    this._configureCalendarService.
    saveOperationalHours(dataToSave).subscribe({
      next: (data: any) => {
        this.showAlert('La información se guardó correctamente');
      },
      error: (error: any) => {
        this.showAlert(`Error al guardar los datos. ${error.message}`);
      }
    })
  }

  showAlert(message:string){
    this.showalert = true;
    this.messagealert = message;
  }

  hideAlert(){
    this.showalert = false;
  }
}

