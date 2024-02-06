import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IOperationalHoursDoctor } from "../models/operationalhoursdoctor.interface";

@Injectable({
    providedIn: 'root'
  })
export class ConfigureCalendarService {
    controller: string = 'configurecalendar';
    pahtservice: string = '';

    /**
     *
     */
    constructor(private _http: HttpClient) {
      const baseURLAPI = 'https://localhost:7166';
      const version = 'v1';
      this.pahtservice = `${baseURLAPI}/api/${version}/doctor`;
    }
      
    getPathService(method: string, doctorId: number = 0){
      switch (method) {
        case 'get': return `${this.pahtservice}/${doctorId}/${this.controller}`;
        case 'post': return `${this.pahtservice}/${doctorId}/${this.controller}`;
      }
      return '';
    }

    getOperationalHours(doctorId: number){
      const path = this.getPathService('get', doctorId);
      //https://localhost:7166/api/v1/doctor/1/configurecalendar
      return this._http.get(path);
    }

    saveOperationalHours(data:IOperationalHoursDoctor){
      debugger;
      const path = this.getPathService('post', data.doctorId);
      //https://localhost:7166/api/v1/doctor/1/configurecalendar
      return this._http.post(path, data );
    }

}
