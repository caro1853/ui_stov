import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IAppointment } from "../models/appointment.interface";

@Injectable({
    providedIn: 'root'
  })
export class AppointmentService {
    controller: string = 'appointment';
    pahtservice: string = '';
    /**
     *
     */
    constructor(private _http: HttpClient) {
        const baseURLAPI = 'https://localhost:7166';
        const version = 'v1';
        this.pahtservice = `${baseURLAPI}/api/${version}`;
    }

    getPathService(method: string){
        switch (method) {
          case 'post': return `${this.pahtservice}/${this.controller}`;
        }
        return '';
    }

    saveAppointment(data: IAppointment){
        const path = this.getPathService('post');
        return this._http.post(path, 
            {...data, 
                scheduledDate: data.scheduledDate.toISOString()
            } );
    }

}