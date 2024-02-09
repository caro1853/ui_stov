import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IOperationalHoursDoctor } from "../models/operationalhoursdoctor.interface";
import { SharedServices } from "./shared.services";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class CalendarService {
    controller: string = 'calendar';
    pahtservice: string = '';

    /**
     *
     */
    constructor(private _http: HttpClient, 
      
      private _sharedServices: SharedServices) {
      const baseURLAPI = environment.baseURLAPI;
      const version = 'v1';
      this.pahtservice = `${baseURLAPI}/api/${version}`;
    }
      
    getPathService(method: string, doctorId: number = 0){
      switch (method) {
        case 'get': return `${this.pahtservice}/${doctorId}/${this.controller}`;
        case 'post': return `${this.pahtservice}/${doctorId}/${this.controller}`;
      }
      return '';
    }

    getOperationalHours(doctorId: number){
      debugger;
      //const path = this.getPathService('get', doctorId);
      const path = `${this.pahtservice}/${this.controller}/getoperationalhours/${doctorId}`;
      return this._http.get(path, {headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this._sharedServices.getTokenSaved() })});
    }

    saveOperationalHours(data:IOperationalHoursDoctor){
      //const path = this.getPathService('post', data.doctorId);
      const path = `${this.pahtservice}/${this.controller}/configureoperationalhours/${data.doctorId}`;
      return this._http.post(path, data, {headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this._sharedServices.getTokenSaved() })});
    }

    getHoursAvailable(doctorId: number, date: Date){        
      const path = `${this.pahtservice}/${this.controller}/gethoursavailable/${doctorId}`;
      const dateString = this._sharedServices.getDateFormattedToString(date);      
      return this._http.get(path, {params: {scheduleDate: dateString},
          headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this._sharedServices.getTokenSaved() })
        });
    }

}
