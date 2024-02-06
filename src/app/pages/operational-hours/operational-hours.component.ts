import { Component, OnInit } from '@angular/core';
import { Hour, IOperationalHours } from 'src/app/models/operationalhours.interface';
import { IOperationalHoursDoctor } from 'src/app/models/operationalhoursdoctor.interface';
import { ConfigureCalendarService } from 'src/app/services/configurecalendar.service';
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
  
  /**
   *
   */
  constructor(private _sharedServices: SharedServices, 
    private _configureCalendarService: ConfigureCalendarService) {
    let c = this._configureCalendarService.
      // TODO: Fix 1
        getOperationalHours(1).subscribe((data: any) => {
          this.data = data;
          this.days = this.loadDays();
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
    debugger;
    let dataToSave: IOperationalHoursDoctor = {
      doctorId: 1,// TODO: Fix 1
      OperationalHours: this.data
    };
    
    this._configureCalendarService.
    saveOperationalHours(dataToSave).subscribe((data: any) => {
      debugger;
      console.log(data);
    });
  }
}

