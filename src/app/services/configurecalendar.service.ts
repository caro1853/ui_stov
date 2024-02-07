import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IOperationalHoursDoctor } from "../models/operationalhoursdoctor.interface";
import { SharedServices } from "./shared.services";

@Injectable({
    providedIn: 'root'
  })
export class ConfigureCalendarService {
    controller: string = 'configurecalendar';
    pahtservice: string = '';

    /**
     *
     */
    constructor(private _http: HttpClient, 
      
      private _sharedServices: SharedServices) {
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
      return this._http.get(path, {headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this._sharedServices.getTokenSaved() })});
    }

    saveOperationalHours(data:IOperationalHoursDoctor){
      const path = this.getPathService('post', data.doctorId);
      
      return this._http.post(path, data, {headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this._sharedServices.getTokenSaved() })});
    }

}
