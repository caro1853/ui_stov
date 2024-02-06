import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class AgendaService {
    controller: string = 'agenda';
    pahtservice: string = '';

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

      getHoursAvailable(doctorId: number, dateString: string){
        //date.toISOString().slice(0, 10)

        const path = this.getPathService('get', doctorId);
        return this._http.get(path, {params: {scheduleDate: dateString}});
      }
}