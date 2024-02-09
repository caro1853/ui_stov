import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IAppointment } from "../models/appointment.interface";
import { SharedServices } from "./shared.services";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class AppointmentService {
    controller: string = 'appointment';
    pahtservice: string = '';
    /**
     *
     */
    constructor(private _http: HttpClient, private _sharedServices: SharedServices) {
        const baseURLAPI = environment.baseURLAPI;
        const version = 'v1';
        this.pahtservice = `${baseURLAPI}/api/${version}`;
    }

    getPathService(method: string){
        switch (method) {
          case 'post': return `${this.pahtservice}/${this.controller}`;
          case 'get': return `${this.pahtservice}/${this.controller}`;
        }
        return '';
    }

    saveAppointment(data: IAppointment){
        const path = this.getPathService('post');
        const dataToSend = {
            ...data,
            scheduledDate: this._sharedServices.getDateFormattedToString(data.scheduledDate)
        };
        return this._http.post( path, dataToSend );
    }

    getAppointmentByDoctorAndDate(doctorId: number, date: Date)
    {
        const path = this.getPathService('get');
        const dateString = this._sharedServices.getDateFormattedToString(date);
        return this._http.get(path, {params: {doctorId: doctorId, scheduleDate: dateString}});
    }

}